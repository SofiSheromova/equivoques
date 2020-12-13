const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

// Require our controllers.
const equivoquesCardController =
    require('../controllers/equivoquesCardController');

// GET request for creating a EquivoquesCard.
router.get('/create',
    equivoquesCardController.equivoquesCardCreationForm);

// POST request for creating EquivoquesCard.
router.post('/create',
    equivoquesCardController.equivoquesCardCreate);

// GET request to delete EquivoquesCard.
router.get('/:id/delete',
    equivoquesCardController.equivoquesCardDeleteForm);

// POST request to delete EquivoquesCard.
router.post('/:id/delete',
    equivoquesCardController.equivoquesCardDelete);

// GET request to update EquivoquesCard.
router.get('/:id/update',
    equivoquesCardController.equivoquesCardUpdateForm);

// POST request to update EquivoquesCard.
router.post('/:id/update',
    equivoquesCardController.equivoquesCardUpdate);

// GET request for one EquivoquesCard.
router.get('/:id',
    equivoquesCardController.equivoquesCardDetail);

// GET request for list of all EquivoquesCard.
router.get('/equivoquescards',
    equivoquesCardController.equivoquesCardList);


module.exports = router;
