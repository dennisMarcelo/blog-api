const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenGenerator = (userOfDatabase) => {
  const { email, displayName, id } = userOfDatabase;

  const secretKey = process.env.JWT_SECRET;
  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  return jwt.sign({ email, displayName, id }, secretKey, jwtConfig);
};

module.exports = {
  tokenGenerator,
};