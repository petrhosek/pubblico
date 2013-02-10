var mongoose = require('mongoose');

var ConferenceSchema = new mongoose.Schema({
	shortName: {type: String, unique: true}
  , longName: String
  , description: String
  , dates: {
        from: { type: Date }
      , to: { type: Date }
    }
  , steering: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
  , pc: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
  
  , submissions: [SubmissionSchema]
  , categories: [String]
  , following_users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
  , submitting_users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
 
});

var SubmissionSchema = new mongoose.Schema({
    sid: String
  , title: String
  , abstract: String
  , authors: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
  , bids: [{user:{ type: mongoose.Schema.ObjectId, ref: 'User' }, selection: {type: String, enum:['yes', 'no', 'maybe', 'conflict']}}]
  , assignment : [{ type: mongoose.Schema.ObjectId, ref: 'User'}]
  , submission: Buffer
  , last_updated: { type: Date, default: Date.now }
  , tags: [String]
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
    reviewer: { type: mongoose.Schema.ObjectId, ref: 'User' }
  , overallMerit: Number
  , qualification: Number
  , last_update: {type: Date, default: Date.now}
  , content:{ 
    summary: String
  	, strengts: String
  	, weaknesses: String
  }
});

/*var ConfSchema = new mongoose.Schema({
	conferences:[
		{type: mongoose.Schema.ObjectId, ref:'Conference'}
		]
	});
*/

module.exports = mongoose.model('Conference', ConferenceSchema);
