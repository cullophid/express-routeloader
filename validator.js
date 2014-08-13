'use strict';
var tv4 = require('tv4');

module.exports = function(req, res, next) {
  var error;
  if (!req.spec) {
    return next();
  }
  if (req.spec.params) {
    error = tv4.validateResult(req.params, req.spec.params);
    if (!error.valid) {
      return next(error);
    }
  }

  if (req.spec.query) {
    error = tv4.validateResult(req.query, req.spec.query);
    if (!error.valid) {
      return next(error);
    }
  }

  if (req.spec.body) {
    error = tv4.validateResult(req.body, req.spec.body);
    if (!error.valid) {
      return next(error);
    }
  }

  return next();
};
