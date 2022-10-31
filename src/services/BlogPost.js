const { BlogPost, PostCategory, User, Category } = require('../models');
const { validationPost, validationPostPut } = require('./validation/schema');

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

const getPosts = async () => {
  const response = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories' }, 
    ], 
  });
  return response;
};

const getPostId = async (id) => {
  const response = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: ['id', 'displayName', 'email', 'image'] },
      { model: Category, as: 'categories' }, 
    ], 
  });
  if (!response) return { type: 'POST_NOT_FOUND', message: 'Post does not exist' };
  return { type: null, message: response };
};

const updatePost = async (idUser, idPost, { title, content }) => {
  const { error } = validationPostPut.validate({ title, content });
  if (error) return { type: 400, message: 'Some required fields are missing' };

  const id = idPost;

  const { dataValues } = await BlogPost.findOne({ where: { id } });
  if (dataValues.userId !== idUser) return { type: 401, message: 'Unauthorized user' };

  await BlogPost.update({ title, content }, { where: { id } });

  const response = await getPostId(id);
  
  return { type: null, message: response.message };
};

const removePost = async (idUser, idPost) => {
  const id = idPost;

  const response = await BlogPost.findOne({ where: { id } });
  if (!response) return { type: 404, message: 'Post does not exist' };
  if (response.dataValues.userId !== idUser) return { type: 401, message: 'Unauthorized user' };

  await BlogPost.destroy({ where: { id } });
  return { type: null, message: '' };
};

module.exports = {
  insertBlogPost,
  getPosts,
  getPostId,
  updatePost,
  removePost,
};