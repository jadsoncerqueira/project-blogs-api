const { categoryService } = require('../services');

const insertCategory = async (req, res) => {
  if ('name' in req.body) {
    const newCategory = await categoryService.insert(req.body);
    return res.status(201).json(newCategory.message);
  }
  return res.status(400).json({ message: '"name" is required' });
};

module.exports = {
  insertCategory,
};