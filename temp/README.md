# serviceexample
ExpressJS middleware

## What does it do?

This is a sample service`

## Usage
Install it:
```sh
npm install -S serviceexample
```

Declare it and use it
```javascript
var serviceexample = require("serviceexample");
// Assuming 'app' is an express object
app.use(serviceexample());
```

Full example:
```javascript
'use strict';
var express = require("express"),
    app = express(),
    serviceexample = require("serviceexample");
    

app.get("/", function(req, res){
    res.send("hello world");
});

app.listen(8080, function(){
   console.log("app started"); 
});
```

## Options


## Developers info
### Code hint
```sh
gulp jshint
```

### Bumping version
Automatically updates ```package.json```, creates a git tag and pushes. **Requires git installed locally**

Patch (bumps 0.0.1 to 0.0.2)
```sh
gulp bump
```

Minor (bumps 0.0.1 to 0.1.0)
```sh
gulp bump --minor
```

Major (bumps 0.0.1 to 1.0.0)
```sh
gulp bump --major
```

Custom version (bumps to 3.0.0)
```sh
gulp bump --version:3.0.0
```