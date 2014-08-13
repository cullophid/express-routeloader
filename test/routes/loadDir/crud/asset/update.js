'use strict';

var route = function (req, res, next) {
    return res.send('PUT /crud/asset/' + req.params.id);
}
route.url = ':id';

module.exports = route;
