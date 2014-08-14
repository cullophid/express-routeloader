'use strict';

module.exports = {
  url : '/createAThing',
  method : 'PUT',
  action : function (req, res) {
    res.send('/resteAThing');
  }
};
