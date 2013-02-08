/*
 * GET /
 */
exports.index = function (req, res) {
  res.render('index');
};

exports.logout = function (req, res) {
  res.render('logout');
}

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
