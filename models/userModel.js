import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please provide an email!"],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "please provide a strong password!"],
    minlength: 6,
  },
  username: {
    type: String,
  },
  photo: {
    type: String,
    default: "default.png",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
