var User = require('../models/User.js');
var Conference = require('../models/Conference.js');

exports.submissions = function(req, res) {
    Conference.findOne({"shortName": req.params.conference},'submissions', function(err, c) {
        if (err) {
            console.log(err);
            res.json(null);
        } else {
			var sub_details = [];
			for (s in c.submissions){
				sub_detais[s] = {'title':c.submissions[s]['title'],
					'abstract':c.submissions[s]['abstract']
				};
			}
            res.json(sub_details);
        }
    });
};

/**
 * This serves the metadata of the specified conference.
 */
exports.conference = function(req, res) {
    Conference.findOne({"shortName": req.params.conference}, 'shortName', function(err, conf_metadata){
        if (err) {
            console.log(err);
            res.json(null);
        } else {
			console.log('bla');
            res.json(conf_metadata);
        }
    });
};
