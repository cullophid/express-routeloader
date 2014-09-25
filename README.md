# Express-routeloader
![travis](https://travis-ci.org/cullophid/express-routeloader.svg)
[![NPM version](https://badge.fury.io/js/express-routeloader.svg)](http://badge.fury.io/js/express-routeloader)
[ ![Codeship Status for cullophid/express-routeloader](https://www.codeship.io/projects/f4240bb0-26c3-0132-3434-0a478c9aef22/status)](https://www.codeship.io/projects/37539)

*This is originally a fork of [Livedocs-routeloader](https://github.com/simonmcmanus/livedocs-routeLoader). Some credit goes to [Simon Mcmannus](https://github.com/simonmcmanus)*

## Basics
Express-routeloader makes it easy to handle endpoints for your REST server.
Express-routeloader builds an express router from your `./routes` folder.

when given a directory structure like

    routes
        - groups.js

where groups is

```js
exports.read = {
    handler : function (req, res) {
        res.send(200);
    }
};
exports.create = {
    handler : function (req, res) {
        res.send(200);
    }
};

```

Express-routeloader will create a router with the following routes:

    POST /groups
    GET /groups/:id



You can use multiple routers in the same project
which is really useful for maintaining multiple versions of an api.

## Routeloader
The routeloader works as a simple router of express:

```js
'use strict';

var express = require('express'),
    app = express(),
router = require('express-routeloader')({/* option */});

app.use(router);

app.listen(3000);
```

### options

`rootDir`: The directory containing your routes. Defaults to `./routes`

`logger`: Logging function. default : `console.log`

`hideCRUD` : Should CRUD endpoints have the extentions be hidden.
`GET assets/read/:id` becomes `GET assets/:id. Defaults to true.

`verbMap`: Json object mapping filenames to default HTTP verbs. default :

```json
{
    "create": "POST",
    "read": "GET",
    "list" : "GET",
    "search" : "GET",
    "update": "PUT",
    "delete": "DELETE"
}
```

`prefix`: prefix for all loaded routes e.g. `/api/v1/`.
this is very useful for maintaining multiple versions of an api.


## Routes
routing endpoints are node modules that export a set of objects with a  method `handler`:

```js
'use strict' // Ofc we are running strict!
exports.hello = {
    handler :function (req, res, next) {
        res.send('world');
    }
};

```

You can overwrite default settings by adding properties to the exported object:

```js
'use strict' // Ofc we are running strict!

exports.hello = {
    url = '/different/route/to/:id',
    method = 'PUT',
    middleware = [func1, func2, func3],
    handler : function (re, res, next) {
        res.send('World');
    }
};
```

### validation
Express-routeloader lets you use json-schema to validate the input to your endpoints.
to add validation simply add the schema to the module.

```js
'use strict' // Ofc we are running strict!

exports.hello = {
    url = 'update/:id',
    method : 'POST',
    params =  {
        required : ['id'],
        properties : {
            handler : {
                type : 'integer',
                minimum : 0
            }
        }
    },
    query = {
        properties : {
            someOption : {
                type : 'boolean'
            }
        }
    },
    body = {
        properties : {
            name : {
                type : 'string',
                maxLength : 80
            }
        }
    },
    handler : function (req, res, next) {
        // do an update
        res.send('world');
    }
};
```
### Promises

Express route validator supports promises.
If a route handler returns a promise,
routeloader with call res.send on promise resolution
and next on rejection.
