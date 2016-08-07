"use strict";
var exec = require("child_process").exec,
	fs = require("fs"),
	info = JSON.parse(fs.readFileSync("package.json"));

var Helpers = {
	bumpParams: ["--patch", "--minor", "--major", "--prerelease"],
	gitCommand( cmd, message ){
		return new Promise(function(resolve, reject){
			console.log(message);
			Helpers.run(cmd, resolve);
		});
	},
	tag (){
		let add = `git add . && git commit -m "Adding delta files before release"`,
			commit = `git tag -a v${info.version} -m "Tag ${info.version}"`,
			push = `git push origin v${info.version}`;
		Helpers.gitCommand(add, "- Adding pending files").then( function(){
			Helpers.gitCommand(commit, "- Commit in progress").then( function(){
				Helpers.gitCommand(push, "- Pushing to origin");
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
		if ( opt && opt !== null && Helpers.bumpParams.indexOf(opt)>=0 ){
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

module.exports = Helpers;