'use strict';

module.exports = function (req, res, next) {
  res.send('works');
}
module.exports.url = 'read/:id';
module.exports.method = 'GET';
