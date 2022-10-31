const { blogPostService } = require('../services');

const insertPost = async (req, res) => {
  const post = await blogPostService.insertBlogPost(req.body, req.user);
  const { message } = post;
  if (message) return res.status(400).json({ message });
  res.status(201).json(post);
};

const getPosts = async (_req, res) => {
  const response = await blogPostService.getPosts();
  res.status(200).json(response);
};

const getPostId = async (req, res) => {
  const { id } = req.params;
  const response = await blogPostService.getPostId(Number(id));
  if (response.type) return res.status(404).json({ message: response.message });
  res.status(200).json(response.message);
};

module.exports = {
  insertPost,
  getPosts,
  getPostId,
};