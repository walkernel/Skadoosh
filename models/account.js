var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');
var CustomObjectProps = new Schema({
  propertyName:String,
  value:String
})
var CustomObject = new Schema({
  identifier: String,
  properties: [CustomObjectProps]
})
var Account = new Schema({
    username: String,
    password: String,
    schemJson:[{
      name:String,
      values:[String]
    }],
    objects: [CustomObject]
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
