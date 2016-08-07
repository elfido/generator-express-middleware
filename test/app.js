"use strict";
var defaultConfig = require("./defaults.json"),
	os = require("os"),
	randoms = require("random-string"),
	should = require("chai").should(),
	fs = require("fs");

var originalPath = process.cwd();

var files = {
	root: ["package.json", ".gitignore", ".editorconfig", "test/middleware.spec.js", "test/server.js", ".jshintrc"]
};

const exec = require("child_process").exec;

function printCwd(){
	console.log(`Current dir ${process.cwd()}`);
}

function exists(fn){
	if (typeof fs.accessSync === "function" && typeof fs.constants !== "undefined"){
		fs.accessSync(fn, fs.constants.R_OK | fs.constants.F_OK | fs.constants.W_OK);
		return true;
	} else {
		return fs.existsSync(fn);
	}
}

describe("When executing Yeoman with a default configuration", function () {
	let tmpFolder = os.tmpdir()+"/gen-express-" + randoms();
	
	before(function(){
		printCwd();
		fs.mkdirSync( tmpFolder );
		fs.writeFileSync(tmpFolder+"/project.json", JSON.stringify(defaultConfig), "utf8");
		console.log(`Temp folder ${tmpFolder}`);
		process.chdir( tmpFolder );
	});
	
	it("Should create files in templates root", function(done){
		const execFile = require("child_process").execFile;
		execFile("yo", ["express-middleware","--usefile"], {timeout: 10000},  (err, stdout, stderr) => {
			console.log(err);
			console.log(stdout);
			console.log(stderr);
			for (let f of files.root){
				exists(`${tmpFolder}/${f}`).should.equal(true);
			}
			done();
		});
	});
});
