const { User } = require('../models');
const CustomError = require('../helpers/CustomError');
const { tokenGenerator } = require('../helpers/token');

const create = async (newUser) => {
  const userExist = await User.findOne({
    where: {
      email: newUser.email,
    },
  });

  if (userExist) throw new CustomError('User already registered', 409);

  const userCreated = await User.create(newUser);

  const token = tokenGenerator(userCreated);
  return token;
};

module.exports = {
  create,
};