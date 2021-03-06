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

const update = async (post, id, user) => {
  const { categoryIds, title, content } = post;

  if (categoryIds) throw new CustomError('Categories cannot be edited', 400);
  const postExist = await BlogPost.findOne({ 
    where: { id },
    include: [
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
   });

   if (!postExist) throw new CustomError('Post does not exist', 404);

   if (postExist.userId !== user.id) throw new CustomError('Unauthorized user', 401);

  const postUpdated = await BlogPost.update({ title, content }, { where: { id } });
 
  if (postUpdated[0] <= 0) throw new CustomError('Post does not update', 400);
  
  postExist.title = post.title;
  postExist.content = post.content;

  return postExist;
};

const remove = async (id, user) => {
  const postExist = await BlogPost.findByPk(id);

  if (!postExist) throw new CustomError('Post does not exist', 404);
  if (postExist.userId !== user.id) throw new CustomError('Unauthorized user', 401);

  const postDeleted = await BlogPost.destroy({ where: { id } });

  return postDeleted;
};

const search = async (query) => {
  console.log(query);
  // consultei: https://stackoverflow.com/questions/20695062/sequelize-or-condition-object/32543638
  const posts = await BlogPost.findAll({ 
    where: Sequelize.or({ title: query }, { content: query }),
    include: [
      { model: User, as: 'user' },
      { model: Categorie, as: 'categories', through: { attributes: [] } },
    ],
   });

  return posts;
};

module.exports = {
  create,
  findById,
  findAll,
  update,
  remove,
  search,
};
