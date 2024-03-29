const Theme = require('../models/theme');

// Display list of all Themes.
exports.themeList = function(req, res) {
  Theme.find({})
      .then((themes) => {
        res.json({themes});
      })
      .catch((error) => {
        res.json({error});
      });
};

// Display detail page for a specific Theme.
exports.themeDetail = function(req, res) {
  Theme.findById(req.params.id)
      .then((theme) => {
        res.json(theme);
      })
      .catch((error) => {
        res.json({error});
      });
};

// Display Theme create form on GET.
exports.themeCreationForm = function(req, res) {
  res.send('NOT IMPLEMENTED: Theme create GET');
};

// Handle Theme create on POST.
exports.themeCreate = function(req, res) {
  new Theme({
    title: req.body.title,
    description: req.body.description,
    ageRestriction: req.body.ageRestriction,
  })
      .save((error, doc) => {
        if (error) {
          res.json({error});
          return;
        }
        res.json(doc);
      });
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
