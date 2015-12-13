var express = require('express');
var passport = require('passport');
var router = express.Router();
var mongoose = require('mongoose');
var accountModel = require('../models/account')

router.get('/',function(req,res){
  accountModel.findOne({"username":/*REPLACEreq._passport.session.user*/"six"},function(err, data){
    res.render("search", {schem: data.schemJson.map(
      function(e){
        return encodeURIComponent(e.name).replace(/'/g, "%27");
      }), values:data.schemJson.map(function(e){
        return e.values.map(function(z){
          return encodeURIComponent(z).replace(/'/g, "%27");
        })+"]"
      })
    });
  });
});

module.exports = router;
