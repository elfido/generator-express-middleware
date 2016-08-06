"use strict";

var defaultOptions = {
		// your default options
	},
	options = {};

var aux = {
	// custom aux functions	
	
	/**
	 * Initializes middleware state
	 *
	 */
	init: function(options){
		if (typeof options === "object"){
			options = Object.assign(options, defaultOptions);
		}
	}
};

function <%= servicename %>(options){
	// Initialize default values from configuration
	aux.init(options);
	
	/**
	 * <%= description %>
	 *
	 */
	return function(req, res, next){
		//Your custom logic
		next();
	};
}

module.exports = <%= servicename %>;