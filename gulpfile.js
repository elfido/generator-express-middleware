"use strict";
var gulp = require("gulp"),
	util = require("gulp-util"),
	fs = require("fs"),
	exec = require('child_process').exec,
	bump = require("gulp-bump"),
	mocha = require('gulp-mocha');

gulp.task("test", function(cb){
	let mochaErr ;
	gulp.src('test/**/*.js')
	.pipe(mocha({reporter: "spec", timeout: 60000}))
	.on("error", function (err) {
		console.log(err);
		mochaErr = err;
	})
	.on("end", function () {
		cb(mochaErr);
	});
});

gulp.task("bump", function(){
	let type = generatorHelpers.getBumpOption();
	gulp.src("./package.json")
	.pipe(bump( type ))
	.pipe(gulp.dest('./'));
});

gulp.task("gittag", function(){
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
});

var generatorHelpers = {
	bumpParams: ["--patch", "--minor", "--major", "--prerelease"],
	run: function(cmd, cb){
		exec(cmd, function(err, stdout, stderr){
			
			console.log(stdout);
			console.log(stderr);
			if(!err){
				cb();
			} else{
				console.dir(err);
			}
		});
	},
	getBumpOption: function(){
		let args = process.argv,
			res = {type: "patch"},
			opt = (args.length>2) ? args[3].toLocaleLowerCase() : null;
		if ( opt !== null && generatorHelpers.bumpParams.indexOf(opt)>=0 ){
			opt = opt.replace("--", "");
			res = {type: opt};
		}
		if ( opt !== null && opt.indexOf("--version") === 0){
			let _version = opt.split(":");
			if (_version.length<1){
				console.error("Invalid version");
			}
			res = {version: _version[1]};
		}
		return res;
	}
}