import express from "express";
import { storage } from "../multer/multer.js";
import {
  userLogin,
  userRegister,
  displayDBUsers,
  followers,
  blockedUser,
  editUserProfile,
} from "../controllers/userController.js";
import multer from "multer";

import { dbConnectionMiddleware } from "../middlewares/dbConnectionMiddleware.js";
import verifyToken from "../auth.js";

export const userRouter = express.Router();
const upload = multer({ storage: storage });


userRouter.post(
  "/register",
    upload.single("user_profile_pic"),
  dbConnectionMiddleware,
  userRegister,
);
userRouter.put(
    "/editProfile/:id",
    verifyToken,
  upload.single("user_profile_pic"),
  dbConnectionMiddleware,
  editUserProfile
);
userRouter.post("/login", dbConnectionMiddleware, userLogin);
userRouter.post("/followers", verifyToken, dbConnectionMiddleware, followers);
userRouter.post("/blockedUsers", verifyToken, dbConnectionMiddleware, blockedUser);
userRouter.get("/displayUsers", dbConnectionMiddleware, displayDBUsers);


