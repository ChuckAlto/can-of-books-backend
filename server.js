'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Book = require('./models/book');
const { response } = require('express');

mongoose.connect(process.env.DB_URL)

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Mongoose is connected')
});

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.get('/book', handleBooks);


async function handleBooks(request, response) {
  let searchQuery = {};
  if (request.query.location) {
    searchQuery = {
      location: request.query.location
    }
  }
  try {
    let booksDB = await Book.find(searchQuery);
    if (booksDB.length > 0) {
      response.status(200).send(booksDB);
    } else {
      response.status(404).send('Error: Try again!');
    }
  } catch (err) {
    response.status(500).send('No connection!');
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
