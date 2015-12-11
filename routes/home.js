var express = require('express');
var passport = require('passport');
var router = express.Router();
var mongoose = require('mongoose');
var accountModel = require('../models/account');

router.get('/all',function(req,res){
  accountModel.findOne({"username":req._passport.session.user},function(err, data){
    res.render("base", {"schem":data.schemJson.name,"objs": data.objects});
  });
});


module.exports = router;
