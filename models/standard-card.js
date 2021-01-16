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

StandardCardSchema.statics.random = function(cb) {
  this.count(function(err, count) {
    if (err) {
      return cb(err);
    }
    const rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(cb);
  }.bind(this));
};

// Export model.
module.exports = mongoose.model('StandardCard', StandardCardSchema);
