"use strict";
var gulp = require("gulp"),
	helpers = require("./setup/utils/helpers"),
	bump = require("gulp-bump"),
	exec = require("child_process").exec,
	fs = require("fs"),
	jshint = require("gulp-jshint"),
	watch = require("gulp-watch"),
	mocha = require("gulp-mocha");

gulp.task("livetest", function(){
	return watch(["test/**/*.spec.js", "index.js"], {})
	.pipe(gulp.dest("test"));
});

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

gulp.task("bump", function(){
	let type = helpers.getBumpOption();
	gulp.src("./package.json")
	.pipe(bump( type ))
	.pipe(gulp.dest("./"))
	.on("end", function(){
		helpers.tag();
	});
});