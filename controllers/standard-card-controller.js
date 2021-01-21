const StandardCard = require('../models/standard-card');
const cardController = require('./card-controller');

// Display list of all StandardCards.
exports.standardCardList = function(req, res) {
  cardController.cardList(StandardCard, req, res);
};

// Display detail page for a specific StandardCard.
exports.standardCardDetail = function(req, res) {
  cardController.cardDetail(StandardCard, req, res);
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

exports.standardCardRandom = function(req, res) {
  cardController.cardRandom(StandardCard, req, res);
};
