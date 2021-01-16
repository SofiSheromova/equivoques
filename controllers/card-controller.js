const Task = require('../models/task');
const Theme = require('../models/theme');
const Category = require('../models/category');

// Display list of all Cards.
exports.cardList = function(req, res) {
  res.send('NOT IMPLEMENTED: Card list');
};

// Display detail page for a specific Card.
exports.cardDetail = function(req, res) {
  res.send('NOT IMPLEMENTED: Card detail: ' + req.params.id);
};

// Display Card create form on GET.
exports.cardCreationForm = function(req, res) {
  res.send('NOT IMPLEMENTED: Card create GET');
};

// Handle Card create on POST.
exports.cardCreate = function(req, res) {
  res.send('NOT IMPLEMENTED: Card create POST');
};

// Display Card delete form on GET.
exports.cardDeleteForm = function(req, res) {
  res.send('NOT IMPLEMENTED: Card delete GET');
};

// Handle Card delete on POST.
exports.cardDelete = function(req, res) {
  res.send('NOT IMPLEMENTED: Card delete POST');
};

// Display Card update form on GET.
exports.cardUpdateForm = function(req, res) {
  res.send('NOT IMPLEMENTED: Card update GET');
};

// Handle Card update on POST.
exports.cardUpdate = function(req, res) {
  res.send('NOT IMPLEMENTED: Card update POST');
};

exports.cardRandom = function(CardModel, req, res) {
  CardModel.random(function(err, card) {
    if (err) {
      return res.status(500).json({error: err});
    }
    const tasks = card.tasks.map((taskID) => {
      return Task.findById(taskID)
          .then((task) => {
            return Promise.all([
              Theme.findById(task.theme).exec(),
              Category.findById(task.category).exec(),
            ]).then(([theme, category]) => {
              task.theme = theme;
              task.category = category;
              return task;
            });
          });
    });

    Promise.all(tasks)
        .then((output) => res.status(200).json(output))
        .catch((error) => res.status(500).json({error}));
  });
};
