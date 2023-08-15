import Comment from "../models/commentModel.js";

const createComment = async (req, res) => {
  try {
    const { comment } = req.body;

    const newComment = await Comment.create({
      comment,
      postId: req.params.id,
      userId: req.user.userId,
    });

    res.status(201).json({
      status: "success",
      commentId: newComment.id,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
      error: err,
    });
  }
};

export default { createComment };
