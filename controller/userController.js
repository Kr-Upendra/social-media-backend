import { findById } from "../utils/userFunction.js";

const getUser = (req, res) => {
  const id = req.user.userId;

  const user = findById(id);
  if (!user)
    return res.status(401).json({
      status: "fail",
      message: "user not found with given id",
    });

  user.followers = user.followers.length;
  user.following = user.following.length;

  res.status(200).json({
    status: "success",
    user,
  });
};

export default {
  getUser,
};
