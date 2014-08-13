'use strict';


var route = function (req, res, next) {
  console.log(req.params);
  return res.send('POST /crud/asset');
};

route.body = {
  required : ['name', 'date'],
  properties : {
    name : {
      type : 'string'
    },
    date : {
      type : 'date'
    }
  }
};

module.exports = route;
