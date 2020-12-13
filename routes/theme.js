const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

// Require our controllers.
const themeController = require('../controllers/themeController');

// GET request for creating a Theme.
// NOTE This must come before route that displays Theme (uses id).
router.get('/create',
    themeController.themeCreationForm);

// POST request for creating Theme.
router.post('/create',
    themeController.themeCreate);

// GET request to delete Theme.
router.get('/:id/delete',
    themeController.themeDeleteForm);

// POST request to delete Theme.
router.post('/:id/delete',
    themeController.themeDelete);

// GET request to update Theme.
router.get('/:id/update',
    themeController.themeUpdateForm);

// POST request to update Theme.
router.post('/:id/update',
    themeController.themeUpdate);

// GET request for one Theme.
router.get('/:id',
    themeController.themeDetail);

// GET request for list of all Theme.
router.get('/all',
    themeController.themeList);


module.exports = router;
