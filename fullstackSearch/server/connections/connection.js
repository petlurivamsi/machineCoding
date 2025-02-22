import mysql from "mysql2/promise";

// Create a connection pool (recommended)
let pool;

const connectToDatabase = async () => {
  if (!pool) {
    pool = mysql.createPool({
      host: "127.0.0.1",
      user: "root",
      password: "12345",
      database: "facebook",
      waitForConnections: true,
      connectionLimit: 10, // Adjust as needed
      queueLimit: 0,
    });
    console.log("✅ Database connected successfully");
  }
  return pool;
};

export default connectToDatabase;
