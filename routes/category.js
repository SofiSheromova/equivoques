const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

// Require our controllers.
const categoryController = require('../controllers/category-controller');

// GET request for list of all Category.
router.get('/all',
    categoryController.categoryList);

// GET request for creating a Category.
router.get('/create',
    categoryController.categoryCreationForm);

// POST request for creating Category.
router.post('/create',
    categoryController.categoryCreate);

// GET request to delete Category.
router.get('/:id/delete',
    categoryController.categoryDeleteForm);

// POST request to delete Category.
router.post('/:id/delete',
    categoryController.categoryDelete);

// GET request to update Category.
router.get('/:id/update',
    categoryController.categoryUpdateForm);

// POST request to update Category.
router.post('/:id/update',
    categoryController.categoryUpdate);

// GET request for one Category.
router.get('/:id',
    categoryController.categoryDetail);


module.exports = router;
