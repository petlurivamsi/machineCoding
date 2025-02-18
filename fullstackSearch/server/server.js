import express from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import { userRouter } from "./routes/userRoute.js";
import { postsRouter } from "./routes/postsRoute.js";

// Create the express app
const app = express();
app.use(cors());
app.use(bodyParser.json());


import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = 8000;


app.get('/data', (req, res) => {
    const responseData = { message: 'Hello, world!' };
    res.json(responseData);
})

// Register other routers
app.use("/api/user", userRouter);
app.use("/api/users/posts", postsRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
