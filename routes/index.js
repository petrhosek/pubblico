var User = require('../models/User');

/*
 * GET /
 */
exports.index = function (req, res) {
  res.render('index');
};

exports.home = function (req, res) {
  res.render('home');
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

/*
 * POST /signup
 */
exports.signup = function (req, res) {
//{login: req.params.login, email: req.params.email, hash: bcryp
  User.register(req.body, function(err, user) {
    if (err) console.log(err);
    res.redirect('/');
  });
};
