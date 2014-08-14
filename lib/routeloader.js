// express-routeloader

'use strict';
var express = require('express'),
  fs = require('fs'),
  path = require('path'),
  _ = require('lodash'),
  validator = require('./validator'),
  defaults = {
    // The default routes directory
    rootDir: './routes',
    // VerbMap maps filenames to default HTTP methods
    verbMap: {
      "create": "POST",
      "read": "GET",
      "list" : "GET",
      "search" : "GET",
      "update": "PUT",
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
    config = _.defaults(options, defaults),
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
    this.loadDir(path.join(process.cwd(), config.rootDir), config.prefix);
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
      if (fs.statSync(dir + '/' + files[i]).isDirectory()) {

        fullPath = relativeRoute + '/' + files[i];
        this.loadDir(path.join(dir, files[i]), fullPath);

      } else {
        //If the file is not a directory, load the file.
        this.loadFile(file, dir, relativeRoute);
      }
    }

  };

  //####scope.loadFile
  //process a file, and add it to the list of routes
  scope.loadFile = function(file, dir, relativeRoute) {
    var fullPath = path.join(dir, file),
      route;
    // Ignore hidden files
    if (file.slice(0, 1) === '.') {
      return;
    }

    route = require(fullPath);
    // if no method is specified, use a default, if not default use get
    route.method = (route.method || config.verbMap[file] || 'get').toLowerCase();
    route.url = this.getUrl(route, relativeRoute);
    if (!route.action || typeof route.action !== 'function') {
      throw new Error(path.join(route.url, file + '.js') +
        ' does not have a method : \'action\'');
    }
    this.routes.push(route);
  };

  //####scope.getUrl
  //Get the relative url to a route
  scope.getUrl = function(route, relativeRoute) {
    // if the url is specified with out an initial "/"
    // it is a relative route
    if (route.url && route.url.slice(0, 1) === '/') {
      return route.url;
    } else if (route.url) {
      return relativeRoute + '/' + route.url;
    } else {
      return relativeRoute;
    }
  };

  //####scope.loadRoutes
  //Load the routes into the router
  scope.loadRoutes = function() {
    var middleware;
    this.routes.forEach(function(route) {
      // Middleware used to define the spec used by the validator
      var setup = function (req, res, next) {
        req.spec = {
          params : route.params || {},
          query : route.query || {},
          body : route.body || {}
        };
        return next();
      };
      // run setup -> validator -> custom middleware -> route
      middleware = [setup, validator].concat(route.middleware ||  []);
      // add the route to the router
      router[route.method](path.join(config.prefix, route.url), middleware, route.action);

      config.logger(route.method, route.url, '\x1B[32m  ✓ \x1B[39m');
    });
  };

  //GO!
  scope.init();

  //Add scope to the router for testing
  router._scope = scope;

  return router;

};
