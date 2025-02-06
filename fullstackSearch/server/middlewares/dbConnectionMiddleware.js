// dbConnectionMiddleware.js
import connectToDatabase from "../connections/connection.js";

export const dbConnectionMiddleware = async (req, res, next) => {
  try {
    // Establish a connection to the database
    req.dbConnection = await connectToDatabase();
    next(); // Pass control to the next handler
  } catch (error) {
    res.status(500).json({ message: "Database connection failed", error });
  }
};
