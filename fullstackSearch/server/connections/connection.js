
import mysql from "mysql2/promise";

let connection;

const connectToDatabase = async () => {
  if (!connection) {
    connection = await mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "12345",
      database: "facebook",
    });
    console.log("✅ Database connected successfully");
  }
  return connection;
};

export default connectToDatabase;

