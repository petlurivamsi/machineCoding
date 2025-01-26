import express from 'express';
import verifyToken from '../auth.js';
import { addPosts, getAllPosts, getPostById } from '../controllers/postsController.js';

export const postsRouter = express.Router();

postsRouter.get("/getPosts", verifyToken, getAllPosts);
postsRouter.post("/addPosts", verifyToken, addPosts);
postsRouter.get("/getPost/:id", verifyToken, getPostById);
