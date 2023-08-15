import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import { findById } from "../utils/userFunction.js";
import { AppError } from "../utils/AppError.js";

const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user.userId })
      .sort({
        createdTime: 1,
      })
      .select("-userId -__v");

    const result = await Promise.all(
      posts.map(async (post) => {
        const comments = await Comment.find({ postId: post.id }).select(
          "-__v -postId -_id"
        );

        const combinedData = {
          ...post.toObject(),
          comments: comments,
          likes: post.likes.length,
        };

        return combinedData;
      })
    );

    res.status(200).json({
      status: "success",
      result: posts.length,
      posts: result,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "some error occured",
      error: err,
    });
  }
};

const getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    let post = await Post.findById(postId).select("-__v -userId");

    if (!post) return next(new AppError("post not found with given id!", 404));

    const comments = await Comment.find({ postId }).select(
      "-__v -userId -postId -_id"
    );

    const combineData = {
      ...post.toObject(),
      comments: comments,
      likes: post.likes.length,
    };

    res.status(200).json({
      status: "success",
      post: combineData,
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
    });
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return next(new AppError("post not found with given id!", 404));

    // Check if the current logged in user deleting his post some other user
    if (req.user.userId !== post.userId)
      return next(
        new AppError("You don't have permission to perform this action!", 401)
      );

    await Post.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "some error occured",
    });
  }
};

const likePost = async (req, res, next) => {
  try {
    const authenticatedUserId = req.user.userId;
    const postToLikeId = req.params.id;

    const authenticatedUser = findById(authenticatedUserId);
    const postToLike = await Post.findById(postToLikeId);

    if (!authenticatedUser)
      return next(new AppError("You are not logged in!", 401));

    if (!postToLike) return next(new AppError("post does not exist!", 404));

    if (postToLike.likes.includes(authenticatedUserId))
      return next(new AppError("You have already liked this post!", 400));

    postToLike.likes.push(authenticatedUserId);
    await postToLike.save();

    res.status(200).json({
      status: "success",
      message: `You liked ${postToLikeId} this post!`,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "some error occured",
    });
  }
};

const unlikePost = async (req, res, next) => {
  try {
    const authenticatedUserId = req.user.userId;
    const postToUnlikeId = req.params.id;

    const authenticatedUser = findById(authenticatedUserId);
    const postToUnlike = await Post.findById(postToUnlikeId);

    if (!authenticatedUser)
      return next(new AppError("You are not logged in!", 401));

    if (!postToUnlike) return next(new AppError("post does not exist!", 404));

    if (!postToUnlike.likes.includes(authenticatedUserId))
      return next(
        new AppError(
          "You haven't liked this post, so you can't unlike this!",
          400
        )
      );

    const index = postToUnlike.likes.indexOf(authenticatedUserId);
    postToUnlike.likes.splice(index, 1);
    await postToUnlike.save();

    res.status(200).json({
      status: "success",
      message: `You unliked ${postToUnlikeId} this post!`,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "some error occured",
    });
  }
};

export default {
  getPost,
  getAllPost,
  createPost,
  deletePost,
  likePost,
  unlikePost,
};
