import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  craetedTime: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: Number,
    },
  ],
  userId: {
    type: Number,
    required: [true, "only authenticated user can create a post!"],
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
