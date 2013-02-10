var User = require('../models/User.js');
var Conference = require('../models/Conference.js');

exports.submissions = (function(req, res) {
    console.log('submissions conference='+req.params.conference);
    Conference.findOne({"shortName": req.params.conference},'submissions', function (err, conf) {
        if (err) {
            console.log(err);
            res.send(500, {error:'Unable to load submissions'});
        } else {
            if (conf !== null) {
                var sub_details = [];
                for (s in conf.submissions){
                    sub_details[s] = {
                        'title': conf.submissions[s]['title'],
                        'abstract': conf.submissions[s]['abstract']
                    };
                }
                console.log(sub_details)
                res.json(sub_details);
            } else {
                console.log(err);
                res.send(404, {error:'No matching conference'});
            }
        }
    });
});


/**
 * This serves the metadata of the specified conference.
 */
exports.conference = (function (req, res) {
    console.log('conferences conference='+req.params.conference);
    Conference.findOne({'shortName': req.params.conference}, 'shortName', function (err, conf_metadata) {
        if (err) {
            console.log(err);
            res.send(500, {error:'Unable to load conference'});
        } else {
            if (conf !== null) {
                console.log(conf_metadata);
                res.json(conf_metadata);
            } else {
                console.log(err);
                res.send(404, {error:'No matching conference'});
            }
        }
    });
});
