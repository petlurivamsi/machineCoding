import express from "express";
import "dotenv/config";
import axios from "axios";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import verifyToken from "./auth.js";
import { userRouter } from "./routes/userRoute.js";
import { postsRouter } from "./routes/postsRoute.js";
import connection from "./connections/connection.js";

const app = express();
app.use(bodyParser.json());

const PORT = 8000;

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.use("/api/user", userRouter);
app.use("/api/users/posts", postsRouter);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
