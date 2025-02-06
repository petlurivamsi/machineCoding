import express from 'express';
import verifyToken from '../auth.js';
import { addComment, addPosts, getAllPosts, getPostById } from '../controllers/postsController.js';
import { dbConnectionMiddleware } from '../middlewares/dbConnectionMiddleware.js';

export const postsRouter = express.Router();

postsRouter.get("/getPosts", verifyToken, dbConnectionMiddleware, getAllPosts);
postsRouter.post("/addPosts", verifyToken, dbConnectionMiddleware, addPosts);
postsRouter.post("/addComment", verifyToken, dbConnectionMiddleware, addComment);
postsRouter.get("/getPost/:id", verifyToken, dbConnectionMiddleware,  getPostById);
