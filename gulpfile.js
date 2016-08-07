"use strict";
var bump = require("gulp-bump"), 
	gulp = require("gulp"),
	helpers = require("./utils/helpers"),
	jshint = require("gulp-jshint"),
	mocha = require("gulp-mocha"),
	watch = require("gulp-watch");

gulp.task("livetest", function(){
	return watch("test/**/*.spec.js", {})
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

