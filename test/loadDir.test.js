'use strict';

var should = require('chai').should(),
  routeloader = require('../');


describe('When loading a directory', function() {
  describe('with a single file', function() {
    var router, route;
    before(function() {
      router = routeloader({
        rootDir: './test/routes/loadDir/single'
      });
      route = router._scope.routes[0];
    });

    it('should have a single route', function() {
      router._scope.routes.should.be.an.Array;
      router._scope.routes.length.should.equal(1);

    });

    it('should have the right url', function() {
      route.should.have.property('url');
      route.url.should.equal('/asset');
    });

    it('should have the right method', function() {
      route.should.have.property('method');
      route.method.should.equal('post');
    });

    it('should have a handle function', function() {
      route.should.have.property('action');
      route.action.should.be.a.Function;
    });

  });
  describe('with all crud types', function() {
    var router, routes;
    before(function() {
      router = routeloader({
        rootDir: './test/routes/loadDir/crud'
      });
      routes = router._scope.routes;
    });

    it('should have 4 routes', function() {
      routes.length.should.equal(4);
    });

    it('should have a create route', function() {
      routes[0].url.should.equal('/asset');
      routes[0].method.should.equal('post');
    });

    it('should have a delete route', function() {
      routes[1].url.should.equal('/asset/:id');
      routes[1].method.should.equal('delete');
    });

    it('should have a read route', function() {
      routes[2].url.should.equal('/asset/:id');
      routes[2].method.should.equal('get');
    });

    it('should have an update route', function() {
      routes[3].url.should.equal('/asset/:id');
      routes[3].method.should.equal('put');
    });

  });

  describe('with a custom url and method', function() {
    var router, routes;
    before(function() {
      router = routeloader({
        rootDir: './test/routes/loadDir/custom'
      });
      routes = router._scope.routes;
    });

    it('should find 2 routes', function() {
      routes.length.should.equal(2);
    });

    it('should return a create file with a custom url / methid', function() {
      routes[0].method.should.equal('put');
      routes[0].url.should.equal('/createAThing');
    });

    it('should return a read file with a custom relative url', function() {
      routes[1].method.should.equal('get');
      routes[1].url.should.equal('/asset/read/:id');
    });

  });
  describe('with an invalid route', function() {
    var error;
    before(function() {
      try {
        routeloader({
          rootDir: './test/invalid'
        });
      } catch (e) {
        error = e;
      }
    });

    it('should throw a friendly error', function() {
      error.message.should.equal(
        '/asset/create.js does not have a method : \'action\'');
    });


  });
});
