'use strict';

var should = require('chai').should(),
  sinon = require('sinon');

describe('Router ', function() {
  var router, req, res, next;
  before(function () {
    router = require('../')('./test/routes/router');
    req = {
      url : '',
      params : {},
      query : {},
      body : {}
    };
    res = {
      send : sinon.spy()
    };
    next = sinon.spy();
  });

  describe('when calling ', function() {
    describe('GET /crud/asset/:id', function() {
      before(function() {
        req.url = '/crud/asset/1';
        req.method = 'GET';
        router(req, res, next);
      });
      after(function () {
        res.send.reset();
        next.reset();
      });

      it('should not call next', function () {
        next.called.should.equal(false);
      });

      it('should call res.send once', function() {
        res.send.calledOnce.should.equal(true);
      });

      it('should return a single response', function() {
        res.send.args[0].length.should.equal(1);
        res.send.args[0][0].should.equal('GET /crud/asset/1');
      });
    });

    describe('POST /crud/asset/', function() {
      before(function() {
        req.url = '/crud/asset';
        req.method = 'POST';
        req.body = {
          name : 'Andreas',
          number : 5
        };
        router(req, res, next);
      });
      after(function () {
        res.send.reset();
        next.reset();
      });
      it('should not call next', function () {
        console.log(next.args[0]);
        next.called.should.equal(false);
      });

      it('should call res.send once', function() {
        res.send.calledOnce.should.equal(true);
      });

      it('should return a single response', function() {
        res.send.args[0].length.should.equal(1);
        res.send.args[0][0].should.equal('POST /crud/asset');
      });
    });

    describe('PUT /crud/asset/:id', function() {
      before(function() {
        req.url = '/crud/asset/2';
        req.method = 'PUT';
        router(req, res, next);
      });
      after(function () {
        res.send.reset();
        next.reset();
      });

      it('should call res.send once', function() {
        res.send.calledOnce.should.equal(true);
      });

      it('should return a single response', function() {
        res.send.args[0].length.should.equal(1);
        res.send.args[0][0].should.equal('PUT /crud/asset/2');
      });
    });

    describe('DELETE /crud/asset/:id', function() {
      before(function() {
        req.url = '/crud/asset/3';
        req.method = 'DELETE';
        router(req, res, next);
      });
      after(function () {
        res.send.reset();
      });

      it('should call res.send once', function() {
        res.send.calledOnce.should.equal(true);
      });

      it('should return a single response', function() {
        res.send.args[0].length.should.equal(1);
        res.send.args[0][0].should.equal('DELETE /crud/asset/3');
      });
    });
  });
});
