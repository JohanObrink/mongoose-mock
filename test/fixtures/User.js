var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var User = new Schema({});
User.statics.createAndSave = function (props, callback) {
  var user = new User(props);
  user.save(function(err, result) {
    callback(err, result);
  });
  return user;
};

module.exports = mongoose.model('User', User);