"use strict";

var defaultOptions = {
		// your default options
	};

var aux = {
	// custom aux functions	
};

function <%= servicename %>(){
	// Initialize default values from configuration
	aux.init();
	
	return function(req, res, next){
		//Your custom logic
		next();
	};
}

module.exports = <%= servicename %>;