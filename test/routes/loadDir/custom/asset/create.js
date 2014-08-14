'use strict';

module.exports = {
  action : function (req, res) {
    res.send(req.params);
  },
  url : '/createAThing',
  method : 'PUT'
};
