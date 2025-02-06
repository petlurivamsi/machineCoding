import axios from "axios";
import jwt from "jsonwebtoken";
import connectToDatabase from "../connections/connection.js";



export const userRegister = async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    user_role,
    hashed_password,
    school,
    mobile,
    dob,
  } = req.body;

  const user_profile_pic = req.file ? req.file.path : "";
  const formattedDob = new Date(dob).toISOString().split("T")[0];
  const imagePath = user_profile_pic.replace(/\\/g, "/"); // Correct file path format
  const imageUrl = `http://localhost:8000/${imagePath}`;
  try {
    const [userData] = await connection.query("Select * from users");

    const emailRegx = /^[\w\.-]+@[a-zA-Z0-9\.-]+\.[a-zA-Z]{2,}$/;

    const isValidEmail = emailRegx.test(email);

    if (!isValidEmail) {
      return res.status(422).json({
        message: `Please enter valid email`,
      });
    }

    const userExists = userData.find((data) => data.Email === email);
    if (userExists) {
      return res.status(409).json({
        message: `User ${email} is already in use`,
      });
    }
    const query = `INSERT INTO Users (firstName, lastName, username, email, user_role, hashed_password, school, mobile, dob, user_profile_pic)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await connection.query(query, [
      firstName,
      lastName,
      username,
      email,
      user_role,
      hashed_password,
      school,
      mobile,
      formattedDob,
      imageUrl,
    ]);
    const [newUser] = await req.dbConnection.query(
      "SELECT * FROM Users WHERE id = ?",
      [result.insertId]
    );
    return res.status(201).json({
      message: "User registered successfully",
      registerUser: newUser,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({
      message: "Something went wrong while registering user",
    });
  }
};

export const userLogin = async (req, res) => {
    const { username, email, password } = req.body;

  try {
    //const registeredUsers = await axios.get("http://localhost:3000/users");
    const [registeredUsers] = await req.dbConnection.query(
      "SELECT * FROM Users WHERE email = ?",
      ["p07@gmail.com"]
    );
      let userExists = registeredUsers.find((user) => user.email === email);

      console.log("userExists", userExists);

    const token = jwt.sign({ userId: userExists.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    if (!userExists) {
      return res.status(404).json({
        message: "User not found with given email",
      });
    } else if (userExists.hashed_password !== password) {
      return res.status(401).json({
        message: "Password does not match",
      });
    } else {
      return res.status(200).json({
        message: "User logged in successfully",
        token,
      });
    }
  } catch (err) {
    console.log("err", err);
    res.status(500).json({
      message: "Something went wrong while user login",
    });
  }
};

export const displayDBUsers = async (req, res) => {
  try {
    const [rows] = await connection.query("Select * from users");
    res.json(rows);
  } catch (ex) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
