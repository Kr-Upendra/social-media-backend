import { findById } from "../utils/userFunction.js";

const getUser = (req, res) => {
  const id = req.user.userId;

  const user = findById(id);
  if (!user)
    return res.status(401).json({
      status: "fail",
      message: "user not found with given id",
    });

  res.status(200).json({
    status: "success",
    user,
  });
};

const followUser = (req, res) => {
  try {
    const authenticatedUserId = req.user.userId;
    const userToFollowId = Number(req.params.id);

    const authenticatedUser = findById(authenticatedUserId);
    const userToFollow = findById(userToFollowId);

    if (!authenticatedUser || !userToFollow)
      return res
        .status(404)
        .json({ status: "fail", message: "User not found!" });

    if (authenticatedUserId === userToFollowId)
      return res
        .status(404)
        .json({ status: "fail", message: "You can't follow yourself!" });

    if (authenticatedUser.following.includes(userToFollowId))
      return res
        .status(400)
        .json({ status: "fail", message: "Already following this user!" });

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

const unFollowUser = (req, res) => {
  try {
    const authenticatedUserId = req.user.userId;
    const userToUnfollowId = Number(req.params.id);

    const authenticatedUser = findById(authenticatedUserId);
    const userToUnfollow = findById(userToUnfollowId);

    console.log({ authenticatedUser });
    console.log({ userToUnfollow });

    if (!authenticatedUser || !userToUnfollow)
      return res
        .status(404)
        .json({ status: "fail", message: "User not found!" });

    if (authenticatedUserId === userToUnfollowId)
      return res.status(404).json({
        status: "fail",
        message: "Sorry, you can't unfollow yourself!",
      });

    if (!authenticatedUser.following.includes(userToUnfollowId))
      return res.status(400).json({
        status: "fail",
        message: "Sorry, you don't follow this user!",
      });

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
