import axios from "axios";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res) => {
    let { name, email, password } = req.body;
    try {
        const userData = await axios.get("http://localhost:3000/users");

        const emailRegx = /^[\w\.-]+@[a-zA-Z0-9\.-]+\.[a-zA-Z]{2,}$/;

        const isValidEmail = emailRegx.test(email);

        if (!isValidEmail) {
            return res.status(422).json({
                message: `Please enter valid email`,
            });
        }

        const userExists = userData.data.find((data) => data.email === email);
        if (userExists) {
            return res.status(409).json({
                message: `User ${email} is already in use`,
            });
        }
        let registerUser = await axios.post("http://localhost:3000/users", {
            name,
            email,
            password,
        });

        res.status(200).json({
            message: "User registered successfully",
            registerUser: registerUser.data,
        });
    } catch (err) {
        console.log("err", err);
        res.status(500).json({
            message: "Something went wrong while registering user",
        });
    }
}

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const registeredUsers = await axios.get("http://localhost:3000/users");
    let userExists = registeredUsers.data.find((user) => user.email === email);

    const token = jwt.sign({ userId: userExists.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    if (!userExists) {
      return res.status(404).json({
        message: "User not found with given email",
      });
    } else if (userExists.password !== password) {
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
