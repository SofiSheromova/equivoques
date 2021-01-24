const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EquivoquesCardSchema = new Schema({
  tasks: {
    type: [Schema.ObjectId],
    ref: 'Task',
    required: true,
    validate: (v) => Array.isArray(v) && v.length === 1,
  },
});

EquivoquesCardSchema
    .virtual('theme')
    .get(function() {
      // eslint-disable-next-line no-invalid-this
      return this.tasks[0].theme;
    });

EquivoquesCardSchema.statics.random = function(ageRestriction, cb) {
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
module.exports = mongoose.model('EquivoquesCard', EquivoquesCardSchema);
