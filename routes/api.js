var User = require('../models/User.js');
var Conference = require('../models/Conference.js');

exports.submissions = function(req, res) {
    Conference.findOne({"name": req.params.conference},'title abstract', function(err, submissions) {
        if (err) {
            console.log(err);
            res.json(null);
        } else {
            res.json(submissions);
        }
    });
};

/**
 * This serves the metadata of the specified conference.
 */
exports.conference = function(req, res) {
    Conference.findOne({"name": req.params.conference}, 'shortName longName dates', function(err, conf_metadata){
        if (err) {
            console.log(err);
            res.json(null);
        } else {
            res.json(conf_metadata);
        }
    });
};
