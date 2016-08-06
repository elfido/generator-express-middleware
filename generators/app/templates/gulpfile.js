"use strict";
var gulp = require("gulp"),
	jshint = require("gulp-jshint"),
	bump = require("gulp-bump"),
	mocha = require('gulp-mocha');

gulp.task("test", function(cb){
	let mochaErr ;
	gulp.src("test/**/*.js")
    .pipe(mocha({reporter: "spec", timeout: 60000}))
    .on("error", function (err) {
      console.log(err);
      mochaErr = err;
    })
    .on("end", function () {
      cb(mochaErr);
    });
});

gulp.task("jshint", function() {
  return gulp.src(["index.js", "test/**/*.js", "src/**/*.js"])
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});