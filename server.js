'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Books = require('./models/books');
const { response } = require('express');
const { findById, findByIdAndDelete } = require('./models/books');

mongoose.connect(process.env.DB_URL)

const db = mongoose.connection;
const verifyUser = require('./auth.js');
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Mongoose is connected')
});

const app = express();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.get('/books', handleGetBooks);
app.post('/books', handlePostBooks);
app.delete('/books/:id', handleDeleteBooks);
app.put('/books/:id', handlePutBooks);
app.get('/user', handleGetUser);

async function handleDeleteBooks(request, response) {
  let id = request.params.id;
  console.log(request.params);
  try {
    await Books.findByIdAndDelete(id);
    response.status(200).send('Successfully deleted');
  } catch (err) {
    response.status(404).send(`Unable to delete id: ${id}`);
  }
}


async function handleGetBooks(request, response) {
  let searchQuery = {};
  if (request.query.email) {
    searchQuery = {
      email: request.query.email
    }
    console.log(request.query);
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

async function handlePostBooks(request, response) {

  try {
    const bookWeMade = await Books.create(request.body)
    response.status(201).send(bookWeMade);
  } catch (err) {
    response.status(500).send('Server Error');
  }
}

async function handlePutBooks(request, response) {
  let id = request.params.id;
  try {
    let updatedBook = await Books.findByIdAndUpdate(id, request.body, { new: true, overwrite: true });
    response.status(200).send(updatedBook);
  } catch (err) {
    response.status(404).send('unable to update')
  }
}

function handleGetUser(request, response) {
  verifyUser(request, (err, user) => {
    if (err) {
      response.send('invalid token');
    } else {
      response.send(user)
    }
  })
}


app.listen(PORT, () => console.log(`Listening on ${PORT}`));
