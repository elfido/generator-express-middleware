"use strict";
var path = require("path"),
	defaultConfig = require("./defaults.json"),
	os = require("os"),
	should = require("chai").should(),
	fs = require("fs");

var originalPath = process.cwd();

var files = {
	root: ["package.json", ".gitignore", ".editorconfig", "test/middleware.spec.js", "test/server.js", ".jshintrc"]
}

function printCwd(){
	console.log(`Current dir ${process.cwd()}`);
}

function exists(fn){
	let status = fs.accessSync(fn, fs.constants.R_OK | fs.constants.F_OK | fs.constants.W_OK);
	return true;
}

describe("When executing Yeoman with a default configuration", function () {
	let tmpFolder = os.tmpdir()+"/gen-express-";
	
	before(function(){
		tmpFolder = fs.mkdtempSync( tmpFolder );
		fs.writeFileSync(tmpFolder+"/project.json", JSON.stringify(defaultConfig), "utf8");
		console.log(`Temp folder ${tmpFolder}`);
		process.chdir( tmpFolder );
	});
	
	it("Should create files in templates root", function(done){
		const execFile = require("child_process").execFile;
		const child = execFile("yo", ["express-middleware","--usefile"], {timeout: 10000},  (err, stdout, stderr) => {
			for (let f of files.root){
				exists(`${tmpFolder}/${f}`).should.equal(true);
			}
			done();
		});
	});
});
