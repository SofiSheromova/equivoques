const EquivoquesCard = require('../models/equivoques-card');
const cardController = require('./card-controller');

// Display list of all EquivoquesCards.
exports.equivoquesCardList = function(req, res) {
  cardController.cardList(EquivoquesCard, req, res);
};

// Display detail page for a specific EquivoquesCard.
exports.equivoquesCardDetail = function(req, res) {
  cardController.cardDetail(EquivoquesCard, req, res);
};

// Display EquivoquesCard create form on GET.
exports.equivoquesCardCreationForm = function(req, res) {
  res.send('NOT IMPLEMENTED: EquivoquesCard create GET');
};

// Handle EquivoquesCard create on POST.
exports.equivoquesCardCreate = function(req, res) {
  res.send('NOT IMPLEMENTED: EquivoquesCard create POST');
};

// Display EquivoquesCard delete form on GET.
exports.equivoquesCardDeleteForm = function(req, res) {
  res.send('NOT IMPLEMENTED: EquivoquesCard delete GET');
};

// Handle EquivoquesCard delete on POST.
exports.equivoquesCardDelete = function(req, res) {
  res.send('NOT IMPLEMENTED: EquivoquesCard delete POST');
};

// Display EquivoquesCard update form on GET.
exports.equivoquesCardUpdateForm = function(req, res) {
  res.send('NOT IMPLEMENTED: EquivoquesCard update GET');
};

// Handle EquivoquesCard update on POST.
exports.equivoquesCardUpdate = function(req, res) {
  res.send('NOT IMPLEMENTED: EquivoquesCard update POST');
};

exports.equivoquesCardRandom = function(req, res) {
  cardController.cardRandom(EquivoquesCard, req, res);
};
