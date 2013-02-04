/*
 * Serve JSON to our AngularJS client
 */

/*
 * GET /posts
 */
exports.posts = function(req, res, next) {
  Page.find(function(err, docs) {
    if (err) return next(err);
    res.json(docs);
  });
};

/*
 * GET /posts/:id
 */
exports.post = function(req, res, next) {
  res.send(req.page);
};

/**
 * POST /pages
 */
exports.addPost = function(req, res, next) {
  var page = new Page();
  page.title = req.body.title;
  page.url = req.body.title; // TODO
  page.content = req.body.content;
  page.save(function(err, doc) {
    if (err) return next(err);
    res.json(doc);
  });
};

/**
 * PUT /pages/:page
 */
exports.editPost = function(req, res, next) {
  req.page.title = req.body.title;
  req.page.content = req.body.content;
  req.page.save(function(err, doc) {
    if (err) return next(err);
    res.json(doc);
  });
};

/**
 * DELETE /pages/:page
 */
exports.deletePost = function(req, res, next) {
  req.page.remove(function(err, doc) {
    if (err) return next(err);
    res.json(doc);
  });
};
