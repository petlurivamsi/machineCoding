// const mysql = require("mysql2");
import mysql from "mysql2";

const connection = mysql
  .createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "facebook",
  })
  .promise();

connection.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.stack);
    return;
  }
  console.log("✅ Database connected successfully as ID", connection.threadId);
});

export default connection;
