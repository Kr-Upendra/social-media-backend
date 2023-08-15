import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: [true, "comments only done on a post!"],
  },
  userId: {
    type: Number,
    required: [true, "comments can only be created by authenticated users!"],
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
