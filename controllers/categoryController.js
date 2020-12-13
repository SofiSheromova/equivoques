const Category = require('../models/category');

// Display list of all Categories.
exports.categoryList = function(req, res) {
  res.send('NOT IMPLEMENTED: Category list');
};

// Display detail page for a specific Category.
exports.categoryDetail = function(req, res) {
  res.send('NOT IMPLEMENTED: Category detail: ' + req.params.id);
};

// Display Category create form on GET.
exports.categoryCreationForm = function(req, res) {
  res.send('NOT IMPLEMENTED: Category create GET');
};

// Handle Category create on POST.
exports.categoryCreate = function(req, res) {
  res.send('NOT IMPLEMENTED: Category create POST');
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
