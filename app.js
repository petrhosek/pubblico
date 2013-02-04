/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
  , stylus = require('stylus')
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
    src: __dirname + '/public',
    dest: __dirname + '/public',
    compress: false
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

/*
 * Express Routes
 */

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

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
