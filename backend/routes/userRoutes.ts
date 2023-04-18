import express from "express";
import * as userController from "../controller/userController";

const router = express.Router();

router.route("/register").post(userController.userRegister);
router.route("/login").post(userController.LoginUser);
router.route("/login-with-token").post(userController.loginWithToken);

export default router;
