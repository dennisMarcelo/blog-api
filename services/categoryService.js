const { Categorie } = require('../models');
const CustomError = require('../helpers/CustomError');

const create = async (newCategory) => {
  const categoryExist = await Categorie.findOne({
    where: {
      name: newCategory.name,
    },
  });

  if (categoryExist) throw new CustomError('Category already registered', 409);

  const categoryCreated = await Categorie.create(newCategory);
  return categoryCreated;
};

const getAll = async () => {
  const categories = await Categorie.findAll();

  return categories;
};

module.exports = {
  create,
  getAll,
};