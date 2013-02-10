var User = require('../models/User');

/*
 * GET /
 */
exports.index = function (req, res) {
  res.render('index');
};

exports.home = function (req, res) {
  var messages = { error: req.flash('error'), warning: req.flash('warning'), info: req.flash('info') };
  res.render('home', messages);
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
 * GET /logout
 */
exports.logout = function (req, res) {
  req.logout();
  res.redirect('/home');
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
