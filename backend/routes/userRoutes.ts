import express from "express";
import * as userController from "../controller/userController";

const router = express.Router();

router.route("/register").post(userController.userRegister);

export default router;
