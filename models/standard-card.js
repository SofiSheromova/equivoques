const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StandardCardSchema = new Schema({
  tasks: {
    type: [Schema.ObjectId],
    ref: 'Task',
    required: true,
    validate: (v) => Array.isArray(v) && v.length === 5,
  },
});

StandardCardSchema
    .virtual('theme')
    .get(function() {
      return this.tasks[0].theme;
    });

// Export model.
module.exports = mongoose.model('StandardCard', StandardCardSchema);
