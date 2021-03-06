var User = require('../models/User');

/*
 * GET /
 */
exports.index = function(req, res) {
  res.render('index');
};

exports.home = function(req, res) {
  var messages = { error: req.flash('error'), warning: req.flash('warning'), info: req.flash('info') };
  res.render('home', messages);
};

/*
 * GET /partials/:name
 */
exports.partials = function(req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

/*
 * GET /directives/:name
 */
exports.directives = function(req, res) {
  var name = req.params.name;
  res.render('directives/' + name);
};

/*
 * GET /passport
 */
exports.passport = function(req, res) {
  res.json(req.session.passport);
};

/*
 * GET /signup
 */
exports.signup = function(req, res) {
  res.render('signup');
}

/*
 * GET /login
 */
exports.login = function(req, res) {
  res.render('login');
}

/*
 * GET /logout
 */
exports.logout = function(req, res) {
  req.logout();
  req.flash('info', 'You have been successfully logged out!');
  res.redirect('/home');
};

/*
 * POST /signup
 */
exports.signupNew = function(req, res) {
  User.register(req.body, function(err, user) {
    if (err) {
      console.log(err);
      req.flash('error', err.err);
      return res.redirect('/home');
    }
    req.login(user, function(err) {
      if (err) {
        console.log(err);
        req.flash('error', err.err);
        return res.redirect('/home');
      }
      res.redirect('/');
    });
  });
};
