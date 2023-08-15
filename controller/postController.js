import Post from "../models/postModel.js";

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user.userId }).sort({
      createdTime: 1,
    });

    posts.map((post) => {
      post.userId = undefined;
    });

    res.status(200).json({
      status: "success",
      result: posts.length,
      posts,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "some error occured",
      error: err,
    });
  }
};

const getPost = async (req, res) => {
  try {
    console.log(req.params.id);

    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({
        status: "fail",
        message: "post not found with given id!",
      });

    res.status(200).json({
      status: "success",
      post,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "some error occured",
      error: err,
    });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;

    const post = await Post.create({
      title,
      description,
      userId: req.user.userId,
    });

    post.userId = undefined;
    post.__v = undefined;

    res.status(201).json({
      status: "success",
      data: post,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
      error: err,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({
        status: "fail",
        message: "post not found with given id!",
      });

    // Check if the current logged in user deleting his post some other user
    if (req.user.userId !== post.userId)
      return res.status(401).json({
        status: "fail",
        message: "You don't have permission to perform this action!",
      });

    await Post.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "some error occured",
      error: err,
    });
  }
};

export default {
  getPost,
  getAllPost,
  createPost,
  deletePost,
};
