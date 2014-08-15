'use strict';

var should = require('chai').should(),
  path = require('path'),
  routeloader = require('../');


describe('When loading a directory', function() {
  var router;
  before(function () {
    router = routeloader('./test/routes/empty');
    router._scope.routes = [];
  });
  describe('with all crud types', function() {
    before(function() {
      router._scope.loadDir(path.join(process.cwd(), './test/routes/loadDir/crud'));
    });


    it('should load 4 routes', function () {
      router._scope.routes.length.should.equal(4);
    });

    it('should return routes with the right properties', function () {
      router._scope.routes[0].should.have.property('url');
      router._scope.routes[0].should.have.property('method');
      router._scope.routes[0].should.have.property('handler');
    });
  });

});
