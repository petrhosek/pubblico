/*  Methods tested:
 *  - insert conference
 *  - insert a submission for a user at a conference
 *  To do:
 *  - check api for other "to do's"
 *  - edit/remove user from a conference
 *  - edit/remove conference
 *  - edit/remove submission from a user at a conference
 *  - edit/remove a review of a user at a conference
 *  - edit/remove author information for a user at a conference
 *  Work in progress:
 *  - list all submissions
 *  - list one submission
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pubblico-dev');     // connect to db pubblico-dev

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var User = require('./models/User.js');                   // load models
var Conference = require('./models/Conference.js');

/* ***** insert users is already done                     */

/* ***** insert conference                                */
var data = {};                                            // data from api
data.userid = 'test2';
data.shortName = 'iccsw_test';
var insert_conference = function(data){                   // query function
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
//insert_conference(data);                                // test

/* ***** insert submission for a user and a conference    */
var data = {};                                            // data from api
data.email = 'test3';
data.shortName = 'iccsw_test';
data.submission = {};
data.submission.sid = 'sid2';
data.submission.title = 'title2';
data.submission.abstract = 'abstract2';
var insert_sub = function(data){                          // query function
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
//insert_sub(data);                                       // test

/* ***** get a submission for a conference                */
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

/* ***** get all submissions for a conference             */
var data = {                                              // data from api
  conf: 'iccsw_test',
  user: 'test2',
  uids: []
};
var list_all_submissions = function(data){                // query function
  // TODO - not optimal, iterate twice through submissions
  //console.log('bla1');

  Conference.findOne({shortName: data.conf}, 'submissions', function(err, doc){
    data.uids = [];                                       // push all user ids here
    data.all_conf = doc;
    for(var s = 0; s < doc.submissions.length; s++){
      for(var a = 0; a < doc.submissions[s].authors.length; a++){
        var uid = doc.submissions[s].authors[a];
        if(data.uids.indexOf(uid) < 0){
          data.uids.push(uid);
        }
      }
    }
    return get_details(data);
  });
}
var get_details = function(data){                         // aux function
  var items   = data.uids                                 // series design pattern
  var results = {}
  function populate_users(){                              // final function in dp
    //console.log('Done', results);
    for(var s = 0; s < data.all_conf.submissions.length; s++){
      for(var a = 0; a < data.all_conf.submissions[s].authors.length; a++){
        var uid = data.all_conf.submissions[s].authors[a];
        data.all_conf.submissions[s].authors[a] = results[uid];
      }
    }
    console.log("Ta-daaa:\n %j",data.all_conf);           // return point
  }
  function series(item) {                                 // iterator function
    if(item) {
      User.findOne({_id:item}, 'name', function(err, doc) {
        if(err){ console.log(err)
        } else{
          results[item] = {name:doc.name};
          return series(items.shift());
        }
      });
    } else {
      return populate_users(results);
    }
  }
  series(items.shift());
}
list_all_submissions(data);                               // test
