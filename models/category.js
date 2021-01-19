const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    lowercase: true,
  },
  specification: {
    type: String,
    required: true,
    default: '',
  },
  duration: {
    type: Date,
    required: true,
    default: new Date(60 * 1000),
    set: (minutes) => new Date(minutes * 60 * 1000),
    get: (time) => time.getTime() / 1000,
  },
  points: {
    type: Number,
    required: true,
    min: 1,
    max: 6,
    validate: [{validator: Number.isInteger, msg: 'Integer expected'}],
  },
});

CategorySchema.set('toJSON', {getters: true});

// Export model.
module.exports = mongoose.model('Category', CategorySchema);
