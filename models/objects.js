var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Object = new Schema({
    password: String,
    schemJson:[{
      name:String,
      values:[String]
    }]
  });

module.exports = mongoose.model('Account', Account);
