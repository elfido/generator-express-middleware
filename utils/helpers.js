"use strict";
var exec = require("child_process").exec,
	info: JSON.parse(fs.readFileSync("package.json")),
	fs = require("fs");

var Helpers = {
	bumpParams: ["--patch", "--minor", "--major", "--prerelease"],
	add(){
		return new Promise(function(resolve,reject){
			let add = `git add . && git commit -m "Adding delta files before release"`;
			Helpers.run(add, resolve);
		});
	},
	tag (){
		let commit = `git tag -a v${info.version} -m "Tag ${info.version}"`,
			push = `git push origin v${info.version}`;
		Helpers.add().then(function(){
			Helpers.run(commit, function(){
				console.log("Commit complete");
				Helpers.run(push, function(){
					console.log("Tag pushed to origin");	
				});
			});
		});
		// Helpers.run(add, function(){
		// 	console.log("Adding all pending files");
		// 	Helpers.run(commit, function(){
		// 		console.log("Commit complete");
		// 		Helpers.run(push, function(){
		// 			console.log("Tag pushed to origin");	
		// 		});
		// 	});
		// });
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
	getBumpOptionn (){
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