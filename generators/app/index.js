"use strict";

var generators = require("yeoman-generator"),
	fs = require("fs");

module.exports = generators.Base.extend({
	
	constructor: function(){
		generators.Base.apply(this, arguments);

		this.project = {};

		this.option("usefile");
	},
	
	readProjectInfo: function(){
		if (this.options.usefile){
			let file = fs.readFileSync("project.json", "utf8");
			this.project = JSON.parse(file);
		}
	},
	
	paths: function(){
		let paths = ["**/*.*", "**/*", "**/.*"];
		
		for (let p of paths){
			this.fs.copyTpl(
				this.templatePath(p),
				this.destinationPath(),
				this.project
			);
		}
		
	}
	
});