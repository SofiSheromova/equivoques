const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  theme: {
    type: Schema.ObjectId,
    ref: 'Theme',
    required: true,
  },
  category: {
    type: Schema.ObjectId,
    ref: 'Category',
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 500,
  },
});

TaskSchema
    .virtual('ageRestriction')
    .get(function() {
      // eslint-disable-next-line no-invalid-this
      return this.theme.ageRestriction;
    });

TaskSchema
    .virtual('points')
    .get(function() {
      // eslint-disable-next-line no-invalid-this
      return this.category.points;
    });

// Export model.
module.exports = mongoose.model('Task', TaskSchema);
