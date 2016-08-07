"use strict";
var gulp = require("gulp"),
	bump = require("gulp-bump"),
	fs = require("fs"),
	jshint = require("gulp-jshint"),
	exec = require("child_process").exec,
	watch = require("gulp-watch"),
	mocha = require("gulp-mocha");

var generatorHelpers = {
	bumpParams: ["--patch", "--minor", "--major", "--prerelease"],
	tag (){
		let info = JSON.parse(fs.readFileSync("package.json")),
			add = `git add . && git commit -m "Adding delta files before release"`,
			commit = `git tag -a v${info.version} -m "Tag ${info.version}"`,
			push = `git push origin v${info.version}`;
		generatorHelpers.run(add, function(){
			console.log("Adding all pending files");
			generatorHelpers.run(commit, function(){
				console.log("Commit complete");
				generatorHelpers.run(push, function(){
					console.log("Tag pushed to origin");	
				});
			});
		});
	},
	run (cmd, cb){
		exec(cmd, function(err, stdout, stderr){
			if(!err){
				cb();
			} else{
				console.dir(err);
			}
		});
	},
	getBumpOption (){
		let args = process.argv,
			res = {type: "patch"},
			opt = (args.length>2) ? args[3] : null;
		if ( opt && opt !== null && generatorHelpers.bumpParams.indexOf(opt)>=0 ){
			opt = opt.toLowerCase().replace("--", "");
			res = {type: opt};
		}
		if ( opt && opt !== null && opt.indexOf("--version") === 0){
			let _version = opt.split(":");
			if (_version.length<1){
				console.error("Invalid version");
			}
			res = {version: _version[1]};
		}
		return res;
	}
};

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
	let type = generatorHelpers.getBumpOption();
	gulp.src("./package.json")
	.pipe(bump( type ))
	.pipe(gulp.dest("./"))
	.on("end", function(){
		generatorHelpers.tag();
	});
});