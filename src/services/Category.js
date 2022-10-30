const { Category } = require('../models');

const insert = async ({ name }) => {
    const newCategory = await Category.create({ name });
    return { type: null, message: newCategory };
};

const getCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  insert,
  getCategories,
};