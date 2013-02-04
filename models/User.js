var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    login: { type: String, unique: true }
  , salt: String
  , hash: String
  , name: {
        first: String
      , last: String
    }
  , email: String
  , affiliation: String
  , roles: [String]
  , submissions: [{ type: mongoose.Schema.ObjectId, ref: 'Submission' }]
  , active: Boolean
});

module.exports = mongoose.model('User', UserSchema);
