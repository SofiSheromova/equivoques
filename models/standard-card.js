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

StandardCardSchema.statics.random = function(ageRestriction, cb) {
  this.countDocuments({}, function(err, count) {
    if (err) {
      return cb(err);
    }
    const rand = Math.floor(Math.random() * count);
    this.findOne()
        .skip(rand)
        .exec(cb);
  }.bind(this));
};

// Export model.
module.exports = mongoose.model('StandardCard', StandardCardSchema);
