# <%= servicename %>
ExpressJS middleware

## What does it do?

<%= description %>

## Usage
Install it:
```sh
npm install -S <%= servicename %>
```

Declare it and use it
```javascript
var <%= servicename %> = require("<%= servicename %>");
// Assuming 'app' is an express object
app.use(<%= servicename %>());
```

Full example:
```javascript
'use strict';
var express = require("express"),
    app = express(),
    <%= servicename %> = require("<%= servicename %>");
    

app.get("/", function(req, res){
    res.send("hello world");
});

app.listen(8080, function(){
   console.log("app started"); 
});
```

## Options
