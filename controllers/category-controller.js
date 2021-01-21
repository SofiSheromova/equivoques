const Category = require('../models/category');

// Display list of all Categories.
exports.categoryList = function(req, res) {
  Category.find({})
      .then((categories) => {
        res.json({categories});
      })
      .catch((error) => {
        res.json({error});
      });
};

// Display detail page for a specific Category.
exports.categoryDetail = function(req, res) {
  Category.findById(req.body.id)
      .then((category) => {
        res.json(category);
      })
      .catch((error) => {
        res.json({error});
      });
};

// Display Category create form on GET.
exports.categoryCreationForm = function(req, res) {
  res.send('NOT IMPLEMENTED: Category create GET');
};

// Handle Category create on POST.
exports.categoryCreate = function(req, res) {
  new Category({
    title: req.body.title,
    specification: req.body.specification,
    duration: req.body.duration,
    points: req.body.points,
  })
      .save((error, doc) => {
        if (error) {
          res.json({error});
          return;
        }
        res.json(doc);
      });
};

// Display Category delete form on GET.
exports.categoryDeleteForm = function(req, res) {
  res.send('NOT IMPLEMENTED: Category delete GET');
};

// Handle Category delete on POST.
exports.categoryDelete = function(req, res) {
  res.send('NOT IMPLEMENTED: Category delete POST');
};

// Display Category update form on GET.
exports.categoryUpdateForm = function(req, res) {
  res.send('NOT IMPLEMENTED: Category update GET');
};

// Handle Category update on POST.
exports.categoryUpdate = function(req, res) {
  res.send('NOT IMPLEMENTED: Category update POST');
};
