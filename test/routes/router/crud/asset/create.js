'use strict';

var route = function (req, res, next) {
  console.log(req.params);
  return res.send('POST /crud/asset');
};

route.body = {
  additionalProperties : false,
  required : ['name', 'number'],
  properties : {
    name : {
      type : 'string'
    },
    number : {
      type : 'integer',
      minimum : 5
    }
  }
};

module.exports = route;
