import express from "express";
import authController from "../controller/authController.js";
import userController from "../controller/userController.js";
const router = express.Router();

router.route("/user").get(authController.protect, userController.getUser);
router.route("/authenticate").post(authController.authenticate);

export { router };
