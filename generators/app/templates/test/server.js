"use strict";

var express = require("express"),
    middleware = require("..");
 
var createServer = function(port, options) {
    let app = express(),
        opts = (typeof options === "object") ? options : {};
    
    app.use(middleware(opts));
 
    app.get("/success", function(req, res) {
        res.send("cool");
    });
    
    app.get("/slow", function(req, res){
       setTimeout(function(){
           res.send("not good");
       }, 100); 
    });
 
    return app.listen(port, function(){
        //console.log("Server is running");
    });
};

if (require.main === module) {
    createServer(8000, {});
} else {
    module.exports = createServer;
}