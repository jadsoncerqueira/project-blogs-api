const { blogPostService } = require('../services');

const insertPost = async (req, res) => {
  const post = await blogPostService.insertBlogPost(req.body, req.user);
  const { message } = post;
  if (message) return res.status(400).json({ message });
  res.status(201).json(post);
};

module.exports = {
  insertPost,
};