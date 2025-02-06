import { storage } from "./multer/multer.js";


// Use import.meta.url to resolve the current directory in ES Modules
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Upload route for single file
export const fileUplod = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const imagePath = req.file.path.replace(/\\/g, "/"); // Correct file path format
  const imageUrl = `http://localhost:8000/${imagePath}`;

  // Respond with the image URL
  res.json({ message: "Image uploaded successfully", imageUrl: imageUrl });
};
