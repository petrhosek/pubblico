var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pubblico-dev');
//var user1 = new User({name: {first: 'Rares', last: 'Turliuc'}, login:'rturliuc' });
//console.log(user1.login);	
//user1.save(function(err, user1){
//	if (err)
//		console.log('err insert'); 
//});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//db.once('open', function callback () {
  // yay!
	var User = require('./models/User.js');
	var Conference = require('./models/Conference.js');
	


	/*
	User.findOne({email:"nickng"}, function(err, user){
		if(err) return handleError(user);
			console.log(user);
		});
	*/
	/*
	Conference.findOne({shortName:'iccsw12'}, 'submissions', function(err, c){
		if(err) return handleError(c);
			var x = [];
			for (s in c.submissions){
				x[s] = {'title':c.submissions[s]['title'],
						'abstract':c.submissions[s]['abstract']
						};
			}
			console.log(x[0]);
		});
	*/
	// import js
	//
	// XXX good code 
	
	var users_json = require('./mock_data/mock_user.json');	
	var conferences_json = require('./mock_data/mock_conference.json');
	
	// enter js in db
	// new schema & model
	/*var UsersSchema = new mongoose.Schema({
		users: [
			{type: mongoose.Schema.ObjectId, ref: 'User'}
		]
		});
	*/
	//var Users_model = mongoose.model('Users', UsersSchema);
	console.log("ok");


	// XXX good code	
	for (i in users_json.users){
		console.log(users_json.users[i]);
		var user = new User(users_json.users[i]);
		user.save(function (err, user) {
				  if (err) console.log(err);// TODO handle the error);	
		});
	}
	
	// XXX good code
	
	for (i in conferences_json.conferences){
		var conf = new Conference(conferences_json.conferences[i]);
		conf.save(function (err, user) {
				  if (err) console.log(err);// TODO handle the error);	
	});
	}
	

	/*
	var ConferencesSchema = new mongoose.Schema({
	   conferences: [
   		{type: mongoose.Schema.ObjectId, ref:'Conference'}
 		]
	});
	*/
	//var Conferences_model = mongoose.model('Conferences', ConferencesSchema);
	//var conferences = new Conferences_model();
	
	//for(i in conferences_json.conferences){
	//	conferences.conferences[i] = new Conference(conferences_json.conferences[i]);
	//	}	
		
	//console.log("ok");
	//users.save();
	//conferences.save();
	//console.log("ok");
	//var user1 = new User({login:'rturliuc'});
	//console.log(user1.login)	
	//user1.save()
	
//});

/*
Conference.findOne({}, 'conferences', function(err, conference){
	if(err) return handleError(err);
	console.log(conference.conferences);
	console.log(conference._id);
	console.log(conference);
});
*/



	// add active
	User.update({}, {active:true}, {multi:true}, function(err, c){
		if(err) return handleError(c);
		});
	// add random stuff
	var stream = User.find().stream();
	stream.on('data', function (doc) {
		var passwd = Math.random().toString(36).substring(7)
		var affils = ['ICL', 'UCL', 'KCL'];
	  	var	affil = affils[Math.floor(Math.random()*affils.length)]
		User.update({_id:doc._id}, {$set: {password: passwd, affiliation: affil}}, function(err){if(err){console.log(err);}})
		console.log(doc._id);
	})
	stream.on('error', function (err) {
  		// handle err
	})

	stream.on('close', function () {
  		// all done
	})

		/*User.find({}, 'email', function(err, doc){if(err){console.log(err);}else{ console.log(doc);}})
		console.log(usr);*/

	var stream = Conference.find().stream();
	stream.on('data', function (doc) {
		var randMonth = Math.floor(Math.random()*12+1);
		var randDay = Math.floor(Math.random()*15+1);
		var fromDate = new Date(2014, randMonth, randDay);
		var toDate = new Date(2014, randMonth, randDay+7);
		var categs = ['model checking', 'theorem proving', 'systems', 'machine learning', 'databases', 'programming languages'];
	  	var	categ = [categs[Math.floor(Math.random()*categs.length)]];
		Conference.update({_id:doc._id}, {$set: {dates: {from: fromDate, to: toDate}, categories:categ}}, function(err){if(err){console.log(err);}})
		
		
		//console.log(doc._id);
	})
	stream.on('error', function (err) {
  		// handle err
	})

	stream.on('close', function () {
  		// all done
	})
	
