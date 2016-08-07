"use strict";

var generators = require("yeoman-generator"),
	inquirer = require("inquirer"),
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
			this._execute();
		} else{
			inquirer.prompt([
				{
					type: "input",
					name: "servicename",
					message: "Service name?"
				},
				{
					type: "input",
					name: "version",
					message: "Service version?",
					default: "1.0.0"
				},
				{
					type: "input",
					name: "description",
					message: "Service description?"
				},
				{
					type: "input",
					name: "coderepository",
					message: "Code repository?",
					default: "none"
				},
				{
					type: "input",
					name: "author",
					message: "Enter your name"
				}
			]).then(function(answers){
				this.project = answers;
				this._execute();
			}.bind(this));
		}
	},
	
	_execute: function(){
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