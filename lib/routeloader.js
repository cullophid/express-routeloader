// Automatic routeloader for express
'use strict';
var express = require('express'),
  fs = require('fs'),
  path = require('path'),
  _ = require('lodash'),
  defaults = {
    // The default routes directory
    rootDir: './routes',
    hideCrud : true,
    // VerbMap maps filenames to default HTTP methods
    verbMap: {
      "create": "POST",
      "read": "GET",
      "update": "PUT",
      "get" : 'GET',
      "delete": "DELETE"
    },
    logger: console.log,
    // All routes are prefixed with :
    prefix: ''
  };


// ## Route loader
// Returns an express router with all the routes in a given foldertree
module.exports = function(options) {
  options = (typeof options === 'string') ? {rootDir : options} : options;
  var router = express.Router(),
    config = _.defaults(options || {}, defaults),
    // ### scope
    // holds all the methods for processing the folders
    // and loading the routes
    scope = {
      routes: []
    };
  // #### scope.init
  // Start loading routes
  scope.init = function() {
    // load the files from the directory
    this.loadDir(path.join(process.cwd(), config.rootDir), '');
    //add the routes to the router
    this.loadRoutes();
  };

  //#### scope.loadDir
  //Recursively load files from directory
  scope.loadDir = function(dir, relativeRoute) {
    var files = fs.readdirSync(dir),
      i, file, fullPath;

    for (i = 0; i < files.length; i += 1) {
      file = path.basename(files[i], '.js'); // get without ext
      // If the file is a directory, run loadDir on it
      fullPath = relativeRoute + '/' + file;
      if (fs.statSync(dir + '/' + files[i]).isDirectory()) {

        this.loadDir(path.join(dir, files[i]), fullPath);

      } else {
        //If the file is not a directory, load the file.
        this.loadFile(file, dir, fullPath);
      }
    }

  };

  //####scope.loadFile
  //process a file, and add it to the list of routes
  scope.loadFile = function(file, dir, relativeRoute) {
    var fullPath = path.join(dir, file),
      route, endpoint;

    // Ignore hidden files
    if (file.slice(0, 1) === '.') {
      return;
    }

    route = require(fullPath);
    for(endpoint in route) {
      // if no method is specified, use a default, if not default use get
      route[endpoint].url = config.prefix + this.getUrl(route[endpoint], endpoint, relativeRoute);
      // validation specs. per default no additional properties are allowed
      // and all url params (e.g :id) to the required properties in the validator spec


      route[endpoint].method = (route[endpoint].method || config.verbMap[endpoint] || 'get').toLowerCase();
      if (!route[endpoint].handler || typeof route[endpoint].handler !== 'function') {
        throw new Error(path.join(route[endpoint].url, file + '.js') +
          ' does not have a method : \'handler\'');
      }
      this.routes.push(route[endpoint]);
    }
  };

  //####scope.getUrl
  //Get the relative url to a route
  scope.getUrl = function(route, name, relativeRoute) {
    // if the url is specified with out an initial "/"
    // it is a relative route
    if (route.url && route.url.slice(0, 1) === '/') {
      return route.url;
    }
    if (route.url) {
      return relativeRoute + '/' + route.url;
    }

    if (config.hideCrud && /^(create|get|read|update|delete)$/i.test(name)) {
      return relativeRoute;
    }

    return relativeRoute + '/' + name;
  };

  //####scope.loadRoutes
  //Load the routes into the router
  scope.loadRoutes = function() {
    var middleware;

    // sort by url so /asset/subasset comes before /asset
    this.routes.sort(function (a, b) {
      return (a.url < b.url)? 1 : 0;
    });
    this.routes.forEach(function(route) {
      // Middleware used to define the spec used by the validator
      // run setup -> validator -> custom middleware -> route
      middleware = route.middleware ||  [];
      // add the route to the router
      router[route.method](route.url, middleware, function (req, res, next) {
        var promise;
        try {
          promise = route.handler(req, res, next);
        } catch (e) {
          return next(e);
        }
        if (promise && promise.then) {
          promise.then(function (data) {
            res.send(data);
          }, function (err) {
              next(err || new Error('Route ', route.url, ' returned a rejected promise with no error'));
          });
        }
      });

      config.logger(route.method.toUpperCase(), route.url, '\x1B[32m  ✓ \x1B[39m');
    });
  };

  //GO!
  scope.init();

  //Add scope to the router for testing
  router._scope = scope;

  return router;

};
