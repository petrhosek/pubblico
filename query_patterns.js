/*	Methods tested:
 *	- insert conference
 *	- insert a submission for a user at a conference
 *	To do:
 *	- check api for other "to do's"
 *	- edit/remove user from a conference
 *	- edit/remove conference
 *	- edit/remove submission from a user at a conference 
 *	- edit/remove a review of a user at a conference
 *	- edit/remove author information for a user at a conference
 *	Work in progress:
 *	- list all submissions
 *	- list one submission
 */ 

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pubblico-dev');				// connect to db pubblico-dev

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var User = require('./models/User.js');								// load models
var Conference = require('./models/Conference.js');

/* ***** insert users is already done								*/							

/* ***** insert conference											*/	
var data = {};														// data from api
data.userid = 'test2';
data.shortName = 'iccsw_test';
var insert_conference = function(data){								// query function
	User.findOne({email:data.userid}, function(err, doc){
		if(err){
			console.log(err);
		}else{ 
			var conf = new Conference({shortName: data.shortName, steering: [doc._id]});
			conf.save();
			//console.log(conf);
		}
});
};
//insert_conference(data);											// test

/* ***** insert submission for a user and a conference				*/
var data = {};														// data from api
data.email = 'test3';
data.shortName = 'iccsw_test';
data.submission = {};
data.submission.sid = 'sid2';
data.submission.title = 'title2';
data.submission.abstract = 'abstract2';
var insert_sub = function(data){									// query function
	User.findOne({email:data.email}, function(err, doc){
		if(err){
			console.log(err);
		}else{ 
			data.submission.authors = [doc._id];

			Conference.update({shortName: data.shortName}, 
				{$push : {submissions: data.submission}}, 
				function(err, c){
					if(err) {return handleError(c);}
					else{ //console.log(c);
				}
			});
		}		
	});
};
//insert_sub(data);													// test 

/* ***** get a submission for a conference							*/
	// TODO
	Conference.findOne({shortName:'iccsw_test'}, 'submissions', function(err, doc){
			if(err){
				console.log(err);
			}else{
				for(s in doc.submissions){
					if(doc.submissions[s].sid=='sid1'){
						//console.log(doc.submissions[s]);
					}
				}
			}
	});

/* ***** get all submissions for a conference			 			*/
var data = {														// data from api
	conf: 'iccsw_test',
	user: 'test2',
	uids: []
};
var list_all_submissions = function(data){							// query function
	// TODO
	//console.log('bla1');

	Conference.findOne({shortName: data.conf}, 'submissions', function(err, doc){
		for(var s = 0; s < doc.submissions.length; s++){
			// doc.submissions[s] - each submission
			for(var a = 0; a < doc.submissions[s].authors.length; a++){
				data.sub = doc.submissions[s];
				var uid = doc.submissions[s].authors[a];
				return get_details(uid, data);
			}
		}
		
	});
}
var get_details = function(uid, data){								// aux function
	console.log(uid);
	console.log(data.sub);
	User.findOne({_id:uid}, 'name', function(err, doc){
		data.sub = []
		data.sub.push({
			name: {
				first: doc.name.first,
				last : doc.name.last
			}	
		})
		console.log(data);
		console.log(data.sub[0]);		
	});
		
}
list_all_submissions(data);											// test




