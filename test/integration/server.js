// #simple server for testing
'use strict';

var express = require('express'),
    app = express();

app.use(function (req, res, next) {
  console.log(req);
  return next();
});
app.use(require('../../')({rootDir : './test/routes'}));

module.exports = app;
