const { Category } = require('../models');

const insert = async ({ name }) => {
    const newCategory = await Category.create({ name });
    return { type: null, message: newCategory };
};

module.exports = {
  insert,
};