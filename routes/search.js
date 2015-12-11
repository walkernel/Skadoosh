var express = require('express');
var passport = require('passport');
var router = express.Router();
var mongoose = require('mongoose');
var accountModel = require('../models/account')

router.get('/',function(req,res){
  accountModel.findOne({"username":req._passport.session.user},function(err, data){
    console.log(data.schemJson);
    res.render("search", {schem:data.schemJson});
  });
});

module.exports = router;
