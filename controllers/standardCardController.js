const StandardCard = require('../models/standardCard');

// Display list of all StandardCards.
exports.standardCardList = function(req, res) {
  res.send('NOT IMPLEMENTED: StandardCard list');
};

// Display detail page for a specific StandardCard.
exports.standardCardDetail = function(req, res) {
  res.send('NOT IMPLEMENTED: StandardCard detail: ' + req.params.id);
};

// Display StandardCard create form on GET.
exports.standardCardCreationForm = function(req, res) {
  res.send('NOT IMPLEMENTED: StandardCard create GET');
};

// Handle StandardCard create on POST.
exports.standardCardCreate = function(req, res) {
  res.send('NOT IMPLEMENTED: StandardCard create POST');
};

// Display StandardCard delete form on GET.
exports.standardCardDeleteForm = function(req, res) {
  res.send('NOT IMPLEMENTED: StandardCard delete GET');
};

// Handle StandardCard delete on POST.
exports.standardCardDelete = function(req, res) {
  res.send('NOT IMPLEMENTED: StandardCard delete POST');
};

// Display StandardCard update form on GET.
exports.standardCardUpdateForm = function(req, res) {
  res.send('NOT IMPLEMENTED: StandardCard update GET');
};

// Handle StandardCard update on POST.
exports.standardCardUpdate = function(req, res) {
  res.send('NOT IMPLEMENTED: StandardCard update POST');
};
