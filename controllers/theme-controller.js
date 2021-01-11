const Theme = require('../models/theme');

// Display list of all Themes.
exports.themeList = function(req, res, next) {
  Theme.find()
      .exec(function(err, listThemes) {
        if (err) {
          return next(err);
        }
        // Successful, so render.
        res.render('theme-list', {title: 'Theme List', themes: listThemes});
      });
};

// Display detail page for a specific Theme.
exports.themeDetail = function(req, res) {
  res.send('NOT IMPLEMENTED: Theme detail: ' + req.params.id);
};

// Display Theme create form on GET.
exports.themeCreationForm = function(req, res) {
  res.send('NOT IMPLEMENTED: Theme create GET');
};

// Handle Theme create on POST.
exports.themeCreate = function(req, res) {
  res.send('NOT IMPLEMENTED: Theme create POST');
};

// Display Theme delete form on GET.
exports.themeDeleteForm = function(req, res) {
  res.send('NOT IMPLEMENTED: Theme delete GET');
};

// Handle Theme delete on POST.
exports.themeDelete = function(req, res) {
  res.send('NOT IMPLEMENTED: Theme delete POST');
};

// Display Theme update form on GET.
exports.themeUpdateForm = function(req, res) {
  res.send('NOT IMPLEMENTED: Theme update GET');
};

// Handle Theme update on POST.
exports.themeUpdate = function(req, res) {
  res.send('NOT IMPLEMENTED: Theme update POST');
};
