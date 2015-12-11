(function(){
	'use strict';

	 var mongoose = require('mongoose');

	  module.exports = function() {
          var phoneSchema = new mongoose.Schema({
            number : Number
            , attInfo : Array
            , routingPlan : Array
            , ivrFlow : Array
            , ivrScript: Array
          });
        mongoose.model("Phone", phoneSchema);
      };
}());
