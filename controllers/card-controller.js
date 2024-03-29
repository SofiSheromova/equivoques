// Display list of all Cards.
exports.cardList = function(CardModel, req, res) {
  CardModel.find({})
      .then((themes) => {
        res.json({themes});
      })
      .catch((error) => {
        res.json({error});
      });
};

// Display detail page for a specific Card.
exports.cardDetail = function(CardModel, req, res) {
  CardModel.findById(req.params.id)
      .populate({
        path: 'tasks',
        model: 'Task',
      })
      .then((card) => {
        res.json(card);
      })
      .catch((error) => {
        res.json({error});
      });
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
  CardModel.random(req.cookies.userAge, function(err, card) {
    if (err) {
      return res.status(500).json({error: err});
    }

    CardModel.findById(card._id)
        .populate({
          path: 'tasks',
          model: 'Task',
          populate: [
            {path: 'theme'},
            {path: 'category'},
          ],
        })
        .then((output) => res.status(200).json(output.tasks))
        .catch((error) => res.status(500).json({error}));
  });
};
