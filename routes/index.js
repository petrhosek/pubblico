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
