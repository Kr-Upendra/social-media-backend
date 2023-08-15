import express from "express";
import postController from "../controller/postController.js";
import authController from "../controller/authController.js";
const router = express.Router();

router.use(authController.protect); // Middleware to authenticate user. This will authenticate all following routes
router.route("/all_posts").get(postController.getAllPost); // Route to get all posts
router.route("/posts").post(postController.createPost); // Route to create a post
router.route("/posts/:id").get(postController.getPost); // Route to get single post with given id
router.route("/posts/:id").delete(postController.deletePost); // Route to delete a post with given id
router.route("/like/:id").post(postController.likePost);
router.route("/unlike/:id").post(postController.unlikePost);

export { router };
