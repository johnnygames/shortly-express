var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var User = db.Model.extend({
  tableName: 'users',
  initialize: function(){
    this.on('creating', function(model, attrs, options) {
      var pwd = model.get('password');
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(pwd, salt);
      model.set('password', hash);
    });
  }
});

module.exports = User;

//var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function (attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function () {
//     var cipher = var Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null)
//       .bind(this)
//       .then(function(hash) {
//         this.set('passowrd', hash);
//       });
//   }
// });