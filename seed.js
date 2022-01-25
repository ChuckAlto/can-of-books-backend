'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

const Books = require('./models/book');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Mongoose is connected')
});

async function seed() {
  await Books.create({
    title: 'Simulation Hypothesis',
    description: 'Book for lovers of sci-fi, computer science and video games',
    status: 'reading',
    email: 'rivkadavidowski@fakeuser.com'
  });
  console.log('simulation saved');
  await Books.create({
    title: 'Foundation',
    description: 'Sci-fi concerning the fall of the galactic empire and one planet holding the hope of the universe',
    status: 'Read',
    email: 'Chuckalto@gmail.com'
  });
  console.log('foundation saved');

  await Books.create({

    title: 'Someone to love me',
    description: 'Young adult fiction of a teenage who finds herself in an abusive relationship',
    status: 'read',
    email: 'hayesregan@whocares.com'
  });
  console.log('someone saved');

  await Books.create({
    title: 'American Pastoral',
    description: 'A look at the tragedies of every day life through the eyes of one american.',
    status: 'read',
    email: 'robbmalexander@gmail.com'
  });
  console.log('american saved');
  
  mongoose.disconnect();
}

seed();
