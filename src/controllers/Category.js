const { categoryService } = require('../services');

const insertCategory = async (req, res) => {
  if ('name' in req.body) {
    const newCategory = await categoryService.insert(req.body);
    return res.status(201).json(newCategory.message);
  }
  return res.status(400).json({ message: '"name" is required' });
};

const getCategories = async (_req, res) => {
  const categories = await categoryService.getCategories();
  return res.status(200).json(categories);
};

module.exports = {
  insertCategory,
  getCategories,
};