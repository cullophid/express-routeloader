'use strict';


module.exports = {
  action : function (req, res) {
    res.send('works');
  },
  url : 'read/:id',
  method : 'GET'
};
