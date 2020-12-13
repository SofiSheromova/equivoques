const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

// Require our controllers.
const taskController = require('../controllers/taskController');

// GET request for creating a Task.
// NOTE This must come before route that displays Task (uses id).
router.get('/create',
    taskController.taskCreationForm);

// POST request for creating Task.
router.post('/create',
    taskController.taskCreate);

// GET request to delete Task.
router.get('/:id/delete',
    taskController.taskDeleteForm);

// POST request to delete Task.
router.post('/:id/delete',
    taskController.taskDelete);

// GET request to update Task.
router.get('/:id/update',
    taskController.taskUpdateForm);

// POST request to update Task.
router.post('/:id/update',
    taskController.taskUpdate);

// GET request for one Task.
router.get('/:id',
    taskController.taskDetail);

// GET request for list of all Task.
router.get('/all',
    taskController.taskList);


module.exports = router;
