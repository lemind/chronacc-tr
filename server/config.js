

module.exports = {
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '6h',
  jwtSecretKey: process.env.JWT_SECRET_KEY || 'secretKey',
};
 