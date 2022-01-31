'use strict'

const jwt = require('jsonwebtoken');

const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: process.env.JWKS_URI
});

function getKey (header, callback) {
  client.getSigningKey (header.kid, function(err, key){
    let signingKey = key.publicKey || key.rsaPublicKey;
    callback (null, signingKey);
  })
}

function verifyUser (request, errFirstOrUserCallbackFunction) {
  try {
    const token = request.headers.authorization.split(' ')[1];
    jwt.verify(token, getKey, {}, errFirstOrUserCallbackFunction);
  } catch (error) {
    errFirstOrUserCallbackFunction('not authorized');
  }
}

module.exports = verifyUser;
