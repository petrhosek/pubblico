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

var SubmissionSchema = new mongoose.Schema({
    title: String
  , abstract: String
  , authors: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
  , bids: [{user:{ type: mongoose.Schema.ObjectId, ref: 'User' }, selection: {type: String, enum:['yes', 'no', 'maybe', 'conflict']}}]
  , assignment : [{ type: mongoose.Schema.ObjectId, ref: 'User'}]
  , submission: Buffer
  , submitted: Date
  , updated: { type: Date, default: Date.now }
  , keywords: [String]
  , reviews: [ReviewSchema]
  , comments: [{
        commenter: { type: mongoose.Schema.ObjectId, ref: 'User' }
      , comment: String
      , commented: Date
    }]
});

SubmissionSchema.path('title').validate(function (value) {
  return value.length > 0
}, 'Title cannot be empty');

var ReviewSchema = new mongoose.Schema({
    reviwer: { type: mongoose.Schema.ObjectId, ref: 'User' }
  , overallMerit: Number
  , qualification: Number
  , novelty: Number
  , technicalMerit: Number
  , interestToCommunity: Number
  , summary: String
  , strengts: String
  , weaknesses: String
});

/*
var BidSchema = new mongoose.Schema({
    submission: { type: mongoose.Schema.ObjectId, ref: 'Submission' }
  , user: { type: mongoose.Schema.ObjectId, ref: 'User' }
  , selection: { type: String, enum: ['yes', 'no', 'maybe', 'conflict'], required: true }
});

var AssignmentSchema = new mongoose.Schema({
    submission: { type: mongoose.Schema.ObjectId, ref: 'Submission' }
  , user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});
*/

module.exports = mongoose.model('Conference', ConferenceSchema);
