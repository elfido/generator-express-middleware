"use strict";
var gulp = require("gulp"),
	mocha = require('gulp-mocha');

gulp.task("test", function(cb){
	let mochaErr ;
	gulp.src('test/**/*.js')
    .pipe(mocha({reporter: "spec", timeout: 60000}))
    .on('error', function (err) {
      console.log(err);
      mochaErr = err;
    })
    .on('end', function () {
      cb(mochaErr);
    });
});