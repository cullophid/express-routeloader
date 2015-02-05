'use strict';

exports.create = {

  handler : function (req, res) {
    console.log(req.params);
    return res.send('POST /crud/assets');
  }

};

exports.delete = {

  handler : function (req, res) {
    return res.send('DELETE /crud/assets/' + req.params.id);
  },
  url : ':id'
};
exports.read = {
  handler :function (req, res) {
    return res.send('GET /crud/assets/' + req.params.id);
  },
  url : ':id'
};

exports.update = {
  handler: function(req, res) {
    return res.send('PUT /crud/assets/' + req.params.id);
  },
  url: ':id'
};
