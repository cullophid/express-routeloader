'use strict';

module.exports = {

  action : function (req, res) {
    console.log(req.params);
    return res.send('POST /crud/asset');
  },
  body : {
    required : ['name', 'date'],
    properties : {
      name : {
        type : 'string'
      },
      date : {
        type : 'date'
      }
    }
  }
};
