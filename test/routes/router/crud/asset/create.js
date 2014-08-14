'use strict';

module.exports = {

  action : function (req, res) {
    console.log(req.params);
    return res.send('POST /crud/asset');
  },
  body : {
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
  }
};
