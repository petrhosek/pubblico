var http = require('http');

var User = require('../models/User.js');
var Conference = require('../models/Conference.js');

/*
 * GET /api/v1/conferences
 * List of (public) conferences.
 */
exports.conferences = (function (req, res) {
  Conference.find({}, 'id shortName longName dates', function (err, confs) {
    if (err) {
      console.log(err);
      res.send(500, {error:'Unable to load list of conferences'});
    } else {
      console.log(confs);
      // It doesn't make sense to send null when
      // no public conferences is completely valid
      res.json((confs !== null) ? confs : []);
    }
  });
});


/*
 * GET /api/v1/conferences/:conference
 * Metadata of the specified conference.
 */
exports.conference = (function (req, res) {
    console.log('conferences conference='+req.params.conference);
    Conference.findOne({'shortName': req.params.conference}, 'shortName', function (err, conf_metadata) {
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
 * GET /api/v1/conferences/:conference/submissions
 * List of submissions associated to the specified conference.
 */
exports.submissions = (function(req, res) {
    console.log('submissions conference='+req.params.conference);
    //http.get(, function (res) {
    //    var data = '';
    //    res.on('data', function (chunk) {
    //        data += chunk;
    //    });
    //    res.on('end', function (err) {
    //        var user = JSON.parse(data);
              var user = { user: { "id": "51170296db4da2b663000003", "email": "florian.rathgeber@gmail.com", "name": {}, "affiliation": "IC"}};
    //        if (user != {}) {
                Conference.findOne({"shortName":req.params.conference},'submissions pc steering', function (err, conf) {
                    console.log(conf);
                    if (err) {
                        console.log(err);
                        res.send(500, {error:'Unable to load submissions'});
                    } else {
                        if (conf !== null) {

                            // Admin of a conference gets full list
                            if (conf.pc.indexOf(user.user.id) > -1 || conf.steering.indexOf(user.user.id) > -1) {
                                var sub_details = [];
                                for (s in conf.submissions){
                                    sub_details[s] = {
                                        'title': conf.submissions[s]['title'],
                                        'abstract': conf.submissions[s]['abstract']
                                    };
                                }
                                console.log(sub_details)
                                res.json(sub_details);
                            } else { // Normal user, filter on author
                                var userEmail = user.user.email;
                                var sub_details = [];
                                for (s in conf.submissions) {
                                    for (a in s.authors) { // XXX We don't have authors field yet
                                        if (a.email == userEmail) {
                                            sub_details[s] = {
                                                'title': conf.submissions[s]['title'],
                                                'abstract': conf.submissions[s]['abstract']
                                            }
                                        }
                                    }
                                }
                                console.log(sub_details)
                                res.json(sub_details);
                            }
                        } else {
                            console.log(err);
                            res.send(404, {error:'No matching conference'});
                        }
                    }
                });
    //       } else {
    //           res.send(401, {error:'Not logged in'});
    //       }
    //   });
    //   res.on('error', function (err) {
    //       console.log(err);
    //       res.send(500, {error:'Cannot authenticate'})
    //   });
    //});
});

/**
 * POST /api/v1/conferences
 */
exports.createConference = (function (req, res) {
  console.log(req.body);
  User.findOne({ email:req.body.user }, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      console.log(user);
      var conf = new Conference({shortName: req.body.shortName, steering: [ user._id ]});
      console.log(conf);
      conf.save(function (err) {
        if (err) console.log(err);
      });
      res.send(201);
    }
  });
});

/*
 *
 */
