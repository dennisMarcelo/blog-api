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

const getAll = async () => {
  const users = await User.findAll();

  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) throw new CustomError('User does not exist', 404);

  return user;
};

const remove = async (id) => {
  const userDeleted = await User.destroy({ where: { id } });

  return userDeleted;
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
};