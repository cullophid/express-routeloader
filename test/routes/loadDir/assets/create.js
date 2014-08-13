'use strict';

module.exports = function (req, res, next) {
  res.send('/resteAThing')
};
module.exports.url = '/createAThing';
module.exports.method = 'PUT';
