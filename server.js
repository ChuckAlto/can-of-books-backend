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
  if (request.query.email) {
    searchQuery = {
      location: request.query.email
    }
  }
  try {
    let bookResults = await Books.find(searchQuery);
    if (bookResults.length > 0) {
      response.status(200).send(bookResults);
    } else {
      response.status(404).send('Error Missing books');
    }
  } catch (err) {
    response.status(500).send('Server Error');
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
