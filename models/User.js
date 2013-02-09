var mongoose = require('mongoose')
  , bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    email: { type: String, unique: true }
  , hash: String
  , name: {
        first: String
      , last: String
    }
  , affiliation: String
  , roles: [String]
  , submissions: [{ type: mongoose.Schema.ObjectId, ref: 'Submission' }]
  , active: Boolean
});

UserSchema.statics.register = function(doc, fn) {
  console.log(doc);
  var password = doc.password;

  delete doc.password; //don't store password
  var salt = bcrypt.genSaltSync(10);
  doc.hash = bcrypt.hashSync(password, salt);

  this.model('User').create(doc, fn);
}

UserSchema.methods.authenticate = function(password, done) {
  bcrypt.compare(password, this.hash, function(err, res) {
    if (err) return done(err);
    if (res) return done(null, this);
    return done(null, false, { message: "Password invalid." });
  });
}

module.exports = mongoose.model('User', UserSchema);
