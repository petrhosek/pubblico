var User = require('../models/User.js');
var Conference = require('../models/Conference.js');

exports.submissions = (function(req, res) {
    console.log('submissions conference='+req.params.conference);
    Conference.findOne({"shortName": req.params.conference},'submissions', function (err, conf) {
        if (err) {
            console.log(err);
            res.send(500, {error:'Unable to load submissions'});
        } else {
            var sub_details = [];
            for (s in c.submissions){
                sub_details[s] = {
                    'title': c.submissions[s]['title'],
                    'abstract': c.submissions[s]['abstract']
                };
            }
            console.log(sub_details)
            res.json(sub_details);
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
            console.log(conf_metadata);
            res.json(conf_metadata);
        }
    });
});
