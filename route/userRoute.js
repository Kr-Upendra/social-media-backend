import express from "express";
import authController from "../controller/authController.js";
import userController from "../controller/userController.js";
const router = express.Router();

router.route("/authenticate").post(authController.authenticate);
router.use(authController.protect);
router.route("/user").get(userController.getUser);
router.route("/follow/:id").post(userController.followUser);

export { router };
