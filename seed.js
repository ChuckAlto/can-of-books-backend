'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);

const Book = require('./models/book');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
  console.log('Mongoose is connected')
});

async function seed(){

const  simulation = new Book ({
  title: 'Simulation Hypothesis',
  description: 'Book for lovers of sci-fi, computer science and video games',
  status: 'reading',
  email: 'rivkadavidowski@fakeuser.com'
});
simulation.save(function(err){
  if(err) console.error(err);
  else console.log('You are in a simulation')
})

const foundation = new Book ({
  title: 'Foundation',
  description: 'Sci-fi concerning the fall of the galactic empire and one planet holding the hope of the universe',
  status: 'Read',
  email: 'Chuckalto@gmail.com'
});
foundation.save(function(err){
  if(err) console.error(err);
  else console.log('Read foundation, don\'t watch the show')
})

  const someone = new Book ({

  title: 'Someone to love me',
  description: 'Young adult fiction of a teenage who finds herself in an abusive relationship',
  status: 'read',
  email: 'hayesregan@whocares.com'
});
someone.save(function(err){
  if(err) console.error(err);
  else console.log('You are loved')
})

  const american = new Book ({
  title: 'American Pastoral',
  description: 'A look at the tragedies of every day life through the eyes of one american.',
  status: 'read',
  email: 'robbmalexander@gmail.com'

});
american.save(function(err){
  if(err) console.error(err);
  else console.log('american works')

});

mongoose.disconnect();
}

seed();
