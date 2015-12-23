var express = require('express');
var passport = require('passport');
var router = express.Router();
var mongoose = require('mongoose');
var accountModel = require('../models/account')

//Search page on website
router.get('/',function(req,res){
  accountModel.findOne({"username":req._passport.session.user},function(err, data){
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


router.post('/', function(req, res){
  accountModel.aggregate([ {$match:{'username':req._passport.session.user}},
   {$project:{"objects":1,_id:0}},
    {$unwind:"$objects"},
    {$match:{"objects.properties":{
      $elemMatch:{
      value:req.body.propertyValue,
      propertyName:req.body.propertyName
      }
    }}
  }],function(err, result){
    console.log(result)
    res.json(result);
    })

})

module.exports = router;
