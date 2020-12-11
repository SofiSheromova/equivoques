const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ThemeSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    lowercase: true,
  },
  description: {
    type: String,
    maxlength: 500,
  },
  ageRestriction: {
    type: Number,
    required: true,
    validate: [{validator: Number.isInteger, msg: 'Integer expected'}],
  },
});

// Export model.
module.exports = mongoose.model('Theme', ThemeSchema);
