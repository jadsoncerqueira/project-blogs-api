const { BlogPost, PostCategory, User, Category } = require('../models');
const { validationPost } = require('./validation/schema');

const insertBlogPost = async ({ title, content, categoryIds }, { email }) => {
  const { error } = validationPost.validate({ title, content, categoryIds });
  if (error) return { type: 'ID_NOT_FOUND', message: error.message };
  
  const categories = categoryIds.map((id) => Category.findOne({
    where: { id },
  }));

  const resolvedPromises = await Promise.all(categories);

  if (resolvedPromises.some((item) => item === null)) {
    return { type: 'ID_NOT_FOUND', message: 'one or more "categoryIds" not found' };
  }

  const { dataValues: { id: userId } } = await User.findOne({ where: { email } });

  const { dataValues } = await BlogPost.create({ title, content, userId });

  const { id: postId } = dataValues;
  await Promise.all(
    categoryIds.map(async (id) => {
      await PostCategory.create({ postId, categoryId: id });
    }),
  );

  return dataValues;
};

module.exports = {
  insertBlogPost,
};