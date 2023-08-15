import { findById } from "../utils/userFunction.js";
import { AppError } from "../utils/AppError.js";

const getUser = (req, res, next) => {
  const id = req.user.userId;

  const user = findById(id);
  if (!user) return next(new AppError("user not found with given id", 404));

  res.status(200).json({
    status: "success",
    user,
  });
};

const followUser = (req, res, next) => {
  try {
    const authenticatedUserId = req.user.userId;
    const userToFollowId = Number(req.params.id);

    const authenticatedUser = findById(authenticatedUserId);
    const userToFollow = findById(userToFollowId);

    if (!authenticatedUser || !userToFollow)
      return next(new AppError("User not found!", 404));

    if (authenticatedUserId === userToFollowId)
      return next(new AppError("You can't follow yourself!", 400));

    if (authenticatedUser.following.includes(userToFollowId))
      return next(new AppError("Already following this user!", 400));

    authenticatedUser.following.push(userToFollowId);
    userToFollow.followers.push(authenticatedUserId);

    res.status(200).json({
      status: "success",
      message: `You started following ${userToFollowId}!`,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "some error occured!",
      error: err,
    });
  }
};

const unFollowUser = (req, res, next) => {
  try {
    const authenticatedUserId = req.user.userId;
    const userToUnfollowId = Number(req.params.id);

    const authenticatedUser = findById(authenticatedUserId);
    const userToUnfollow = findById(userToUnfollowId);

    if (!authenticatedUser || !userToUnfollow)
      return next(new AppError("User not found!", 404));

    if (authenticatedUserId === userToUnfollowId)
      return next(new AppError("Sorry, you can't unfollow yourself!", 400));

    if (!authenticatedUser.following.includes(userToUnfollowId))
      return next(new AppError("Sorry, you don't follow this user!", 400));

    authenticatedUser.following.splice(
      authenticatedUser.following.indexOf(userToUnfollowId),
      1
    );
    userToUnfollow.followers.splice(
      userToUnfollow.followers.indexOf(authenticatedUserId),
      1
    );

    res.status(200).json({
      status: "success",
      message: `${authenticatedUserId} unfollowed ${userToUnfollowId}!`,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "some error occured!",
      error: err,
    });
  }
};

export default {
  getUser,
  followUser,
  unFollowUser,
};
