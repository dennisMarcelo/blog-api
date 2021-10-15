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

const newCategory = (category) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
  }).validate(category);
  
  if (error) throw new CustomError(error.message, 400);
};

const newPost = (post) => {
  console.log(post);
  const { error } = Joi.object({
    title: Joi.string().not().empty().required(),
    content: Joi.string().not().empty().required(),
    categoryIds: Joi.array().items(Joi.number().required()).required(),
  }).validate(post);
  
  if (error) throw new CustomError(error.message, 400);
};

module.exports = {
  newUser,
  loginUser,
  newCategory,
  newPost,
};