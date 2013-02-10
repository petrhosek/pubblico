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
 * GET /passport
 */
exports.passport = function (req, res) {
  res.json(req.session.passport);
};

/*
 * POST /signup
 */
exports.signup = function (req, res) {
  User.register(req.body, function(err, user) {
    if (err) console.log(err);
    res.redirect('/');
  });
};
