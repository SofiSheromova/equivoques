const Task = require('../models/task');
const Theme = require('../models/theme');
const Category = require('../models/category');

// Display list of all Tasks.
exports.taskList = function(req, res) {
  Task.find({})
      .then((tasks) => {
        res.json({tasks});
      })
      .catch((error) => {
        res.json({error});
      });
};

// Display detail page for a specific Task.
exports.taskDetail = function(req, res) {
  Task.findById(req.params.id)
      .populate('theme')
      .populate('category')
      .then((task) => {
        res.json(task);
      })
      .catch((error) => {
        res.json({error});
      });
};

// Display Task create form on GET.
exports.taskCreationForm = function(req, res) {
  res.send('NOT IMPLEMENTED: Task create GET');
};

// Handle Task create on POST.
exports.taskCreate = function(req, res) {
  Promise.all([
    Theme.findById(req.body.themeID).exec(),
    Category.findById(req.body.categoryID).exec(),
  ])
      .then(([theme, category]) =>
        new Task({
          theme,
          category,
          content: req.body.content,
        })
            .save((error, doc) => {
              if (error) {
                throw error;
              }
              res.json(doc);
            }),
      )
      .catch((error) => {
        res.json({error});
      });
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
