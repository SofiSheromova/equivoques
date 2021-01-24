const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

// Require our controllers.
const themeController = require('../controllers/theme-controller');

// GET request for list of all Theme.
router.get('/all',
    themeController.themeList);

// GET request for creating a Theme.
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

module.exports = router;
