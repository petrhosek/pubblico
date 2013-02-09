var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pubblico');
//var user1 = new User({name: {first: 'Rares', last: 'Turliuc'}, login:'rturliuc' });
//console.log(user1.login);	
//user1.save(function(err, user1){
//	if (err)
//		console.log('err insert'); 
//});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  // yay!
	var User = require('./models/User.js');
	var Conference = require('./models/Conference.js');
	// import js
	var users_json = require('./mock_data/mock_user.json');	
	var conferences_json = require('./mock_data/mock_conference.json');
	// enter js in db
	// new schema & model
	var UsersSchema = new mongoose.Schema({
		users: [
			{type: mongoose.Schema.ObjectId, ref: 'User'}
		]
		});
	var Users_model = mongoose.model('Users', UsersSchema);
	var users = new Users_model();	
	console.log("ok");
	for (i in users_json.users){
		users.users[i] = new User(users_json.users[i]);
	}

	var ConferencesSchema = new mongoose.Schema({
	   conferences: [
   		{type: mongoose.Schema.ObjectId, ref:'Conference'}
 		]
	});
	var Conferences_model = mongoose.model('Conferences', ConferencesSchema);
	var conferences = new Conferences_model();
	for(i in conferences_json.conferences){
		conferences.conferences[i] = new Conference(conferences_json.conferences[i]);
	}	
		
	console.log("ok");
	users.save();
	conferences.save();
	console.log("ok");
	//var user1 = new User({login:'rturliuc'});
	//console.log(user1.login)	
	//user1.save()
});

