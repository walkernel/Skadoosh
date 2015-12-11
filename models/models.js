(function(){
	'use strict';
	var register_models;
	register_models = function(){
		var exported_model, i,  path_fn,
			files 		= ['phonen.js'];
		for(i = 0; i < files.length; i++) {
			path_fn = "./" + files[i];
			exported_model = require(path_fn);
			exported_model();
		}
	};
	module.exports = register_models;
}());
