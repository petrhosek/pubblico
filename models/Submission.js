var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
    reviwer: { type: mongoose.Schema.ObjectId, ref: 'User' }
  , overAllMerit: Number
  , reviewerQualification: Number
  , novelty: Number
  , technicalMerit: Number
  , interestToCommunity: Number
  , summary: String
  , strengts: String
  , weaknesses: String
  , comments: String
  , comments: [{
    }]
});

var SubmissionSchema = new mongoose.Schema({
    title: String
  , abstract: String
  , authors: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
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

module.exports = mongoose.model('Submission', SubmissionSchema);
