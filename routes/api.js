var http = require('http');

var User = require('../models/User.js');
var Conference = require('../models/Conference.js');


/*
 * GET /api/v1/conferences
 */
exports.conferences = (function (req, res) {
  Conference.find({}, 'id shortName longName dates description', function (err, confs) {
    if (err) {
      console.log(err);
      res.send(500, {error:'Unable to load list of conferences'});
    } else {
      console.log(confs);
      res.json(confs);
    }
  });
});


/*
 * POST /api/v1/conferences
 */
exports.conference_new = (function (req, res) {
  console.log(req.body);
  User.findOne({ email:req.body.user }, function (err, user) {
    if (err) {
      console.log(err);
      res.send(500, {error:'Unable to create conference'})
    } else {
      console.log(user);
      var conf = new Conference({shortName: req.body.shortName, steering: [ user._id ]});
      console.log(conf);
      conf.save(function (err) {
        if (err) {
          console.log(err);
          res.send(500, {error:'Cannot save conference'});
        }
      });
      res.send(201);
    }
  });
});


/*
 * GET /api/v1/conferences/:conference
 */
exports.conference = (function (req, res) {
  console.log('conferences conference='+req.params.conference);
  Conference.findOne({'shortName': req.params.conference}, 'id shortName longName dates description', function (err, conf_metadata) {
    if (err) {
      console.log(err);
      res.send(500, {error:'Unable to load conference'});
    } else {
      if (conf_metadata !== null) {
        console.log(conf_metadata);
        res.json(conf_metadata);
      } else {
        console.log(err);
        res.send(404, {error:'No matching conference'});
      }
    }
  });
});

/*
 * GET /api/v1/conferenes/:conference/submissions
 * GET /api/v1/conferences/:conference/submissions/all
 */
exports.submissions_all = (function(req, res) {
  console.log('submissions_all conference='+req.params.conference);

  Conference.findOne({ "shortName":req.params.conference },'submissions', function (err, conf) {
      console.log(conf);
      if (err) {
        console.log(err);
        res.send(500, {error:'Unable to load submissions'});
      } else {
        console.log(conf);
        for (var i=0; i<conf.submissions.length; i++) {
          if (conf.submissions[i].authors != undefined) {
            for (var j=0; j<conf.submissions[i].authors.length; j++) {
              conf.submissions.current_id = i;
              User.findById(conf.submissions[i].authors[j], {affiliation:1, email:1, name:1, _id:0}, function (err, u) {
                if (err) {
                  console.log(err);
                  res.send(500);
                } else {
                  conf.submissions[conf.submissions.current_id].authors = [ u ];
                  res.json(conf.submissions);  // XXX This only works for the first author in the first submission..
                }
              });
            }
          }
        }
      }
    });
});

/*
 * POST /api/v1/conference/:conference/submissions/user
 */
exports.submission_new = (function (req, res) {
  console.log('submission_new conference='+req.params.conference);

  User.findOne({ email: req.body.user }, function (err, user) {
    if (err) {
      console.log(err);
      res.send(500, {error:'Cannot find user'});
    } else {
      var newSubmission = {
        title: req.body.title,
        abstract: req.body.abstract,
        sid: 'sid1',
        authors: [ user._id ]
      }
      Conference.update({ shortName: req.params.conference }, { $push: { submissions: newSubmission } }, function (err, count) {
        if (err) {
          console.log(err);
        } else {
          console.log(count);
          res.send(201);
        }
      })
    }
  });
});
