import express from "express";
import { loginUser, registerUser, userLogout } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", userLogout);

export default userRouter;