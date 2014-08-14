'use strict';

module.exports = {
  action :function (req, res) {
    return res.send('GET /crud/asset/' + req.params.id);
  },
  url : ':id'
};
