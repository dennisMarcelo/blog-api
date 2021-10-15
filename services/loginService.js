const { User } = require('../models');
const CustomError = require('../helpers/CustomError');
const { tokenGenerator } = require('../helpers/token');

const login = async (loginUser) => {
  const userExist = await User.findOne({
    where: {
      email: loginUser.email,
    },
  });

  if (!userExist) throw new CustomError('Invalid fields', 400);

  if (loginUser.email !== userExist.email && loginUser.password !== userExist.password) { 
    throw new CustomError('Invalid fields', 400);
  }

  const token = tokenGenerator(userExist);
  return token;
};

module.exports = {
  login,
};