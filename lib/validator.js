'use strict';
var tv4 = require('tv4'),
  E = require('express-http-errors'),
  custom = require('./customValidators');

tv4.defineKeyword('stringtype', custom.stringType);


module.exports = function(req, res, next) {
  var error;
  if (!req.spec) {
    return next();
  }
  if (req.spec.params) {
    error = tv4.validateResult(req.params, req.spec.params);
    if (!error.valid) {
      console.log(error);
      console.log(req.params);
      console.log(req.spec.params);
      return next(new E.BadRequestError(error.error.message));
    }
  }

  if (req.spec.query) {
    error = tv4.validateResult(req.query, req.spec.query);
    if (!error.valid) {
      console.log(error);
      console.log(req.body);
      console.log(req.spec.body);
      return next(new E.BadRequestError(error.error.message));
    }
  }

  if (req.spec.body) {
    error = tv4.validateResult(req.body, req.spec.body);
    if (!error.valid) {
      console.log(error);
      console.log(req.body);
      console.log(req.spec.body);
      return next(new E.BadRequestError(error.error.message));
    }
  }

  return next();
};
