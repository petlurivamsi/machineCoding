import express from 'express';
import verifyToken from '../auth.js';
import { addComment, addPosts, approvePost, deleteComment, deletePost, displayPosts, editComment, editPost, editPostImages, getAllPosts, getPostById, likesComment, likesPost, postImages } from '../controllers/postsController.js';
import { dbConnectionMiddleware } from '../middlewares/dbConnectionMiddleware.js';
import multer from 'multer';
import { storage } from '../multer/multer.js';

const upload = multer({ storage: storage });

export const postsRouter = express.Router();

postsRouter.get("/getPosts", verifyToken, dbConnectionMiddleware, getAllPosts);
postsRouter.post("/addPosts", verifyToken, dbConnectionMiddleware, addPosts);
postsRouter.put("/editPost/:id", verifyToken, dbConnectionMiddleware, editPost);
postsRouter.delete(
  "/deletePost/:id",
  verifyToken,
  dbConnectionMiddleware,
  deletePost
);
postsRouter.put(
  "/approvePost",
  verifyToken,
  dbConnectionMiddleware,
  approvePost
);
postsRouter.post("/addComment", verifyToken, dbConnectionMiddleware, addComment);
postsRouter.put(
  "/editComment",
  verifyToken,
  dbConnectionMiddleware,
  editComment
);
postsRouter.delete(
  "/deleteComment",
  verifyToken,
  dbConnectionMiddleware,
  deleteComment
);

postsRouter.post("/likeComment", verifyToken, dbConnectionMiddleware, likesComment);
postsRouter.post("/likePost", verifyToken, dbConnectionMiddleware, likesPost);
postsRouter.post("/postImages", verifyToken, dbConnectionMiddleware, upload.any(), postImages);
postsRouter.put(
  "/editPostImages/:id",
  verifyToken,
  dbConnectionMiddleware,
  upload.any(),
  editPostImages
);

postsRouter.get("/getPost/:id", verifyToken, dbConnectionMiddleware,  getPostById);
postsRouter.get("/displayPosts", verifyToken, dbConnectionMiddleware,  displayPosts);
