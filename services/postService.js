const Sequelize = require('sequelize');
const CustomError = require('../helpers/CustomError');

const { BlogPost, PostsCategorie, User, Categorie } = require('../models');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const create = async (post, user) => {
  const { title, content, categoryIds } = post;
  const { id } = user;
  try {
    return await sequelize.transaction(async (t) => {
       const postCreated = await BlogPost.create(
        { title, content, userId: id, published: new Date(), updated: new Date() },
        { transaction: t },
      );
      
      const relationOfTagPost = categoryIds
        .map((categoryId) => ({ postId: postCreated.id, categoryId }));
      
      await PostsCategorie.bulkCreate(relationOfTagPost, { transaction: t });
      
      return postCreated;
    });
  } catch (err) {
    throw new CustomError('"categoryIds" not found', 400);
  }
};

const findAll = async () => {
  const posts = await BlogPost.findAll({ 
    include: [
      { model: User, as: 'user' },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
   });

   if (!posts) throw new CustomError('Not have posts', 404);
  return posts;
};

const findById = async (id) => {
  const post = await BlogPost.findOne({ 
    where: { id },
    include: [
      { model: User, as: 'user' },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
   });

   if (!post) throw new CustomError('Post does not exist', 404);
  return post;
};

module.exports = {
  create,
  findById,
  findAll,
};