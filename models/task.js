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
    .virtual('ageRestrictions')
    .get(function() {
      return this.theme.ageRestrictions;
    });

TaskSchema
    .virtual('points')
    .get(function() {
      return this.category.points;
    });

// Export model.
module.exports = mongoose.model('Task', TaskSchema);
