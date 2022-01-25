'use strict';

const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.DB_URL);
const Books = require('./models/books');

async function clear() {
  try {
    await Books.deleteMany({});
    console.log('All books burned!');
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

clear();
