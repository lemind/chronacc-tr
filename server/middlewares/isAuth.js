const expressJwt = require('express-jwt');
const config = require('../config');

const getTokenFromHeader = (req) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }
}

module.exports = expressJwt({
  secret: config.jwtSecretKey,
  userProperty: 'token',
  getToken: getTokenFromHeader,
  credentialsRequired: false,
  algorithms: ['HS256'],
})
