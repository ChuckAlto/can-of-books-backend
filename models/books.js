'use strict'

const mongoose = require('mongoose');
const {Schema} = mongoose;


const bookSchema = new Schema ({
  name: { type: String },
  description: { type: String},
  status: { type: String},
  email: {type: String}
});

const Books = mongoose.model('Books', bookSchema);

module.exports = Books;
