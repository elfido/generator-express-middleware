/* globals describe, before, after, it */
"use strict";

var server = require("./server"),
	request = require("supertest"),
	should = require("chai").should(),
	port = 3001,
	app;
	
describe("Scenario: ", function(){
	before(function(){
		app = server( port );    
	});
	
	after(function(){
		app.close(); 
	});
	
	describe("When <replace for some condition>", function(){
		it("It should do something", function(done){
			request(app).get("/success").expect(200).end(function(req, res){
				//Use chai here to validate something
				done();
			});
		});
	});
});

