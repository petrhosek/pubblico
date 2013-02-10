var User = require('../models/User.js');
var Conference = require('../models/Conference.js');

/**
 * Gets the list of (public) conferences.
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


/**
 * Gets the metadata of the specified conference.
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


/**
 * Gets the list of submissions associated to the specified conference.
 */
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
