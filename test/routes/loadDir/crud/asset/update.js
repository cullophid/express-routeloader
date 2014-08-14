'use strict';

module.exports = {

  action: function(req, res) {
    return res.send('PUT /crud/asset/' + req.params.id);
  },
  url: ':id'
};
