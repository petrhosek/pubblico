var async = require ('async')
  , glob = require('glob');

/*
 * GET /
 */
exports.index = function (req, res) {
  // strip "public" from the front of files
  var preheaderLength = 'public'.length;

  // grab all the JS files
  var jsFiles = async.concat([
    'public/js/lib/**/*.js',
    'public/js/*.js',
    'public/js/controllers/*.js',
    'public/js/directives/*.js',
    'public/js/services/*.js'
  ], function (pattern, callback) {
    glob(pattern, function (err, matches) {
      callback(err, matches.map(function (match) {
        match.substr(preheaderLength);
      }));
    });
  }, function (err, files) {
    res.render('index', {
      jsFiles: files
    });
  });
};

/*
 * GET /partials/:name
 */
exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

/*
 * GET /directives/:name
 */
exports.directives = function (req, res) {
  var name = req.params.name;
  res.render('directives/' + name);
};
