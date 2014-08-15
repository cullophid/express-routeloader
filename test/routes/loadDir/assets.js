'use strict';

exports.createAThing = {
  method : 'PUT',
  handler : function (req, res) {
    res.send('/resteAThing');
  }
};

exports.create = {
  url : 'create/:id',
  handler : function (req, res) {
    res.send(req.body);
  }
}
