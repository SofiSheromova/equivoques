const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

// Require our controllers.
const standardCardController =
    require('../controllers/standard-card-controller');

// GET request for list of all StandardCard.
router.get('/all',
    standardCardController.standardCardList);

// GET request for creating a StandardCard
router.get('/create',
    standardCardController.standardCardCreationForm);

// POST request for creating StandardCard.
router.post('/create',
    standardCardController.standardCardCreate);

// GET request to delete StandardCard.
router.get('/:id/delete',
    standardCardController.standardCardDeleteForm);

// POST request to delete StandardCard.
router.post('/:id/delete',
    standardCardController.standardCardDelete);

// GET request to update StandardCard.
router.get('/:id/update',
    standardCardController.standardCardUpdateForm);

// POST request to update StandardCard.
router.post('/:id/update',
    standardCardController.standardCardUpdate);

// GET request for one StandardCard.
router.get('/:id',
    standardCardController.standardCardDetail);

router.get('/',
    standardCardController.standardCardRandom);

module.exports = router;
