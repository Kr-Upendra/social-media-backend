import commentController from "../controller/commentController.js";
import authController from "../controller/authController.js";
import express from "express";
const router = express.Router();

router.use(authController.protect);

router.route("/comment/:id").post(commentController.createComment);

export { router };
