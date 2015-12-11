var express = require('express');
var passport = require('passport');
var router = express.Router();
var mongoose = require('mongoose');
var accountModel = require('../models/account')

router.get('/schem', function(req, res) {

  res.render('objprops');
});

router.post('/schem', function(req, res) {
  var customVals = [];
  //gets values from form and strips name, and flattens them
  var customVals = Object.keys(req.body).map(function(k) {
    return req.body[k]
  });
  var tempSchem = [];
  for (var i = 1; i < customVals.length; i += 2) {
    var tempSchemObj = {};
    tempSchemObj.name = [customVals[i]];
    tempSchemObj.values = customVals[i + 1] === 'unique' ? ['Unique Value'] : ['Shared Value'];
    tempSchem.push(tempSchemObj)
  }
  accountModel.findOneAndUpdate({
      "username": req._passport.session.user
    }, {
      $set: {
        'schemJson': tempSchem,
        'objectName': req.body.objName,
        "objects": []
      }
    }, {
      'new': true
    },
    function(err, data) {
      if (err) throw err;
      res.redirect('/new/object');
    });
});

router.get('/object', function(req, res) {
  accountModel.findOne({
    "username": req._passport.session.user
  }, function(err, data) {
    if (err) throw err;
    res.render('addobj', {
      properties: data.schemJson
    });
  });
});

router.post('/object', function(req, res) {
  accountModel.findOne({
    "username": req._passport.session.user
  }, function(err, data) {
    var schemTemp = data.schemJson;
    var objProps = [];
    for (var i = 0; i < Object.keys(req.body).length; i++) {
      var tempObjProp = {};
      tempObjProp.propertyName = Object.keys(req.body)[i] + "";
      tempObjProp.value = req.body[tempObjProp.propertyName] + "";
      data.schemJson[i].values.push(req.body[Object.keys(req.body)[i]]);
      objProps.push(tempObjProp);
    }

    console.log(data.schemJson);

    var fullobj = {};
    fullobj.identifier = objProps.splice(0, 1)[0].value;
    fullobj.properties = objProps;
    var allObj = data.objects.concat(fullobj);
    data.update({
      objects: allObj,
      schemJson: schemTemp
    }, function(err) {
      if (err) throw err;
    });
    res.render('objProps')
  });
});
module.exports = router;
