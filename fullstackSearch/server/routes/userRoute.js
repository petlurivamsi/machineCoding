import express from "express";
import { storage } from "../multer/multer.js";
import {
  userLogin,
  userRegister,
  displayDBUsers,
} from "../controllers/userController.js";
import multer from "multer";
import connectToDatabase from "../connections/connection.js";
import { dbConnectionMiddleware } from "../middlewares/dbConnectionMiddleware.js";

export const userRouter = express.Router();
const upload = multer({ storage: storage });

const connection = await connectToDatabase();
userRouter.post(
  "/register",
    upload.single("user_profile_pic", 10),
  dbConnectionMiddleware,
  userRegister,
);
userRouter.post("/login", dbConnectionMiddleware, userLogin);
userRouter.get("/displayUsers", dbConnectionMiddleware, displayDBUsers);


