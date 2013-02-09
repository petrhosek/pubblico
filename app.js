/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
  , passport = require('passport')
  , stylus = require('stylus')
  , nib = require('nib')
  , routes = require('./routes')
  , api = require('./routes/api');

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
        .use(nib());
    }
  }));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('development', function() {
  //mongoose.connect('mongodb://localhost/blog');
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

app.configure('production', function() {
  //mongoose.connect('mongodb://user:pass@host:port/dbname');
  app.use(express.errorHandler())
});

var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) done (err);
      if (!user) {
        return done(null, false, { message: "Username invalid." });
      }
      bcrypt.compare(password, user.hash, function (err, didSucceed) {
        if (err) done (err);
        if (didSucceed) done(null, user);
        return done(null, false, { message: "Password invalid." });
      });
    });
  }));

/*
 * Express Routes
 */

app.get('/', routes.index);
app.get('/home', routes.home);
app.get('/partials/:name', routes.partials);

app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' }));

// Redirect all others to the index

app.get('*', routes.index);

/*
 * JSON API
 */

app.get('/api/v1/submissions', api.posts);
app.get('/api/v1/submissions/:id', api.post);
app.post('/api/v1/submissions', api.addPost);
app.put('/api/v1/submissions/:id', api.editPost);
app.delete('/api/v1/submissions/:id', api.deletePost);

// app.resource('posts', require('/resources/posts'), {base: '/api/v1/'});

/*
 * Start server
 */

server.listen(process.env.PORT || 3000, function () {
  console.log("Express server listening on port %d in %s mode", server.address().port, app.settings.env);
});
