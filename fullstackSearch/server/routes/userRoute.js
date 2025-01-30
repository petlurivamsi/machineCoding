import express from "express";
import {
  userLogin,
  userRegister,
  displayDBUsers,
} from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/displayUsers", displayDBUsers);
