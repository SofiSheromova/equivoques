const Task = require('../models/task');

// Display list of all Tasks.
exports.taskList = function(req, res) {
  res.send('NOT IMPLEMENTED: Task list');
};

// Display detail page for a specific Task.
exports.taskDetail = function(req, res) {
  res.send('NOT IMPLEMENTED: Task detail: ' + req.params.id);
};

// Display Task create form on GET.
exports.taskCreationForm = function(req, res) {
  res.send('NOT IMPLEMENTED: Task create GET');
};

// Handle Task create on POST.
exports.taskCreate = function(req, res) {
  res.send('NOT IMPLEMENTED: Task create POST');
};

// Display Task delete form on GET.
exports.taskDeleteForm = function(req, res) {
  res.send('NOT IMPLEMENTED: Task delete GET');
};

// Handle Task delete on POST.
exports.taskDelete = function(req, res) {
  res.send('NOT IMPLEMENTED: Task delete POST');
};

// Display Task update form on GET.
exports.taskUpdateForm = function(req, res) {
  res.send('NOT IMPLEMENTED: Task update GET');
};

// Handle Task update on POST.
exports.taskUpdate = function(req, res) {
  res.send('NOT IMPLEMENTED: Task update POST');
};
