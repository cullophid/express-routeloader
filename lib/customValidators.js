'use strict';
exports.stringType = function(data, schema) {
  if (schema.toLowerCase() === 'integer') {
    return exports._integer(data);
  }
  if (schema.toLowerCase() === 'boolean') {
    return exports._boolean(data);
  }
};

exports._integer = function(data) {
  var num = Number(data);
  if (Number.isNan(num)) {
    return "is not a number";
  }
  if (num % 1 !== 0) {
    return 'is not an integer';
  }
  return null;
};

exports._boolean = function (data) {
  return (data) ? true : false;
};
