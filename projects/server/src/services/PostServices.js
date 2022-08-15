const Post = require("../models/PostModels");

async function listing(data) {
  const posts = await Post.find(data ? data : {});
  return posts;
}

async function createPost(text) {
  const post = new Post(text);
  await post.save();
}

async function deletePost(id) {
  const post = await Post.findByIdAndDelete(id);
  return post;
}

async function updatePost({ id, text, like }) {
  const query = {};
  if (text) query.text = text;
  if (like) query.like = like;

  const post = await Post.updateOne({ _id: id }, { $set: query });

  return post;
}

module.exports = {
  createPost,
  listing,
  deletePost,
  updatePost,
};
