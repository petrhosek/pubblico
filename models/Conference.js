var mongoose = require('mongoose');

var ConferenceSchema = new mongoose.Schema({
    name: { type: String, required: true }
  , dates: {
        from: { type: Date }
      , to: { type: Date }
    }
  , committee: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
  , submissions: [SubmissionSchema]
  , categories: [{
        name: String
    }]
});

var BidSchema = new mongoose.Schema({
    submission: { type: mongoose.Schema.ObjectId, ref: 'Submission' }
  , user: { type: mongoose.Schema.ObjectId, ref: 'User' }
  , selection: { type: String, enum: ['yes', 'no', 'maybe', 'conflict'], required: true }
});

var AssignmentSchema = new mongoose.Schema({
    submission: { type: mongoose.Schema.ObjectId, ref: 'Submission' }
  , user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Conference', ConferenceSchema);
