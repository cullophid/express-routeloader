# Express-routeloader

*This is a fork of [Livedocs-routeloader](https://github.com/simonmcmanus/livedocs-routeLoader). All credit goes to [Simon Mcmannus](https://github.com/simonmcmanus)*

## Basics
Express routeloader makes it easy to handle andpoints for your REST server.
Express-routeloader builds an express router from your `./routes` folder.

when given a directory structure like

    routes
        - groups
            - create.js
            - read.js
            - update.js
            - delete.js
            - users
                create.js


Express-routeloader will create a router with the following routes:

    POST /groups
    GET /groups/:id
    PUT /groups/:id
    DELETE /groups/:id

    POST /groups/users

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
routing endpoints are node modules that export a function:

```js
'use strict' // Ofc we are running strict!
module.exports = function (re, res, next) {
    res.send('Hello world');
};

```

You can overwrite default settings by adding properties to the exported object:

```js
'use strict' // Ofc we are running strict!

var route = function (re, res, next) {
    res.send('Hello world');
};

route.url = '/different/route/to/:handler';
route.method = 'PUT';
route.middleware = [func1, func2, func3]
module.exports = route;
```

### validation
Express-routeloader lets you use json-schema to validate the input to your endpoints.
to add validation simply add the schema to the module.

```js
'use strict' // Ofc we are running strict!

var route = function (req, res, next) {
    // do an update
    res.send('Hello world');
};
route.url = 'update/:handler';
rote.params =  {
    required : ['handler'],
    properties : {
        handler : {
            type : 'integer',
            minimum : 0
        }
    }
}
route.query = {
    properties : {
        someOption : {
            type : 'boolean'
        }
    }
}
route.body = {
    properties : {
        name : {
            type : 'string',
            maxLength : 80
        }
    }
}
module.exports = route;
```
