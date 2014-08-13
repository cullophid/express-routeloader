'use strict';

module.exports = function (req, res, next) {
  res.send(req.params);
}
module.exports.url = '/createAThing';
module.exports.method = 'PUT';
