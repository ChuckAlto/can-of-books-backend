'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Books = require('./models/books');
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

app.get('/books', handleGetBooks);


async function handleGetBooks(request, response) {
  let searchQuery = {};
  if (request.query.location) {
    searchQuery = {
      location: request.query.location
    }
  }
  try {
    let booksDB = await Books.find(searchQuery);
    if (booksDB.length > 0) {
      response.status(200).send(booksDB);
    } else {
      response.status(404).send('Error Missing books');
    }
  } catch (err) {
    response.status(500).send('No connection!');
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
