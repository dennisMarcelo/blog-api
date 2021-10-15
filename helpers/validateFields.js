const Joi = require('joi');
const CustomError = require('./CustomError');

const newUser = (user) => {
  const { error } = Joi.object({
    displayName: Joi.string().min(8).not().empty()
      .required(),
    email: Joi.string().email().not().empty()
      .required(), 
    password: Joi.string().length(6).not().empty()
      .required(),
    image: Joi.string().allow(null, ''),
  }).validate(user);

  if (error) throw new CustomError(error.message, 400);
};

const loginUser = (user) => {
  const { error } = Joi.object({
    email: Joi.string().email().not().empty()
      .required(), 
    password: Joi.string().length(6).not().empty()
      .required(),
  }).validate(user);
  
  if (error) throw new CustomError(error.message, 400);
};

module.exports = {
  newUser,
  loginUser,
};