/**
 * Module dependencies.
 */

var express = require('express')
  , manifest = require('./package.json')
  , mongoose = require('mongoose')
  , bcrypt = require('bcrypt')
  , passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , stylus = require('stylus')
  , nib = require('nib')
  , routes = require('./routes')
  , api = require('./routes/api')
  , User = require('./models/User');

var host = process.env.HOST || "0.0.0.0";
var app = module.exports = express();
var server = require('http').createServer(app);

/*
 * Configuration
 */

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(stylus.middleware({
    src: __dirname + '/views',
    dest: __dirname + '/public',
    compile: function (str, path) {
      return stylus(str)
        .set('filename', path)
        .set('compress', true)
        .use(nib())
        .import('nib');
    }
  }));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({secret: process.env.SESSION_SECRET || 'shhhhhhh!'}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function() {
  mongoose.connect('mongodb://'+host+'/'+manifest.name+'-dev');
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('production', function() {
  mongoose.connect(process.env.MONGOHQ_URL || 'mongodb://'+host+'/'+manifest.name);
  app.use(express.errorHandler())
});


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({ email: email }, function (err, user) {
      if (err) return done (err);
      if (!user) return done(null, false, { message: "Username invalid." });
      return user.authenticate(password, done);
    });
  }));

passport.serializeUser(function(user, done) {
  done(null, {id: user._id, email: user.email, name: user.name.full, affiliation: user.affiliation});
});

passport.deserializeUser(function(user, done) {
  User.findById(user.id, function(err, user) {
    done(err, user);
  });
});

/*
 * Express Routes
 */

app.get('/', routes.index);
app.get('/home', routes.home);
app.get('/partials/:name', routes.partials);
app.get('/passport', routes.passport);
app.get('/logout', routes.logout);

app.post('/signup', routes.signup);
app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' }));

/*
 * JSON API
 */

app.get('/api/v1/conferences', api.conferences);
app.get('/api/v1/conferences/:conference', api.conference);
app.get('/api/v1/conferences/:conference/submissions', api.submissions_all);
app.get('/api/v1/conferences/:conference/submissions/all', api.submissions_all);

// app.resource('posts', require('/resources/posts'), {base: '/api/v1/'});

app.post('/api/v1/conferences', api.conference_new);
app.post('/api/v1/conferences/:conference/submissions/user', api.submission_new);

// Redirect all others to the index

app.get('*', routes.index);


/*
 * Start server
 */

server.listen(process.env.PORT || 3000, function () {
  console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
});
