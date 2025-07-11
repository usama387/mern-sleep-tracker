import express from "express";
import { getUserProfileDetails, loginUser, registerUser, userLogout } from "../controllers/user.controller.js";
import isUserAuthenticated from "../middleware/isUserAuthenticated.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", userLogout);
userRouter.get("/getProfile",isUserAuthenticated, getUserProfileDetails);

export default userRouter;