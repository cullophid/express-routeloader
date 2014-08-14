'use strict';

module.exports = {

  action : function (req, res) {
    return res.send('DELETE /crud/asset/' + req.params.id);
  },
  url : ':id'

};
