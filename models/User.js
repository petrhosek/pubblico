var mongoose = require('mongoose')
  , bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    email: { type: String, unique: true }
  , password: String
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
  var salt = bcrypt.genSaltSync(10);
  doc.password = bcrypt.hashSync(doc.password, salt);
  this.model('User').create(doc, fn);
}

UserSchema.methods.authenticate = function(password, done) {
  var user = this;
  bcrypt.compare(password, user.password, function(err, res) {
    if (err) return done(err);
    if (res) return done(null, user);
    return done(null, false, { message: "Password invalid." });
  });
}

module.exports = mongoose.model('User', UserSchema);
