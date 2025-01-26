import express from "express";
import "dotenv/config";
import axios from 'axios'
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import verifyToken from "./auth.js";
import { userRouter } from "./routes/userRoute.js";
import { postsRouter } from "./routes/postsRoute.js";


const app = express();
app.use(bodyParser.json());

const PORT = 8000;

app.get('/', (req, res) => {
    res.status(200).send('Hello World')
})

app.use("/api/user", userRouter);
app.use("/api/users/posts", postsRouter);

// app.post('/posts', verifyToken, async (req, res) => {
//     const { id, name, description } = req.body;
//     try {
//         const postsData = await axios.get("http://localhost:3000/posts");
//         const dataExists = postsData.data.find((data) => data.id === id);
//         if (dataExists) {
//             return res.status(409).json({
//                 message: `Post ${id} already exists`,
//             });
//         }
//         const response = await axios.post("http://localhost:3000/posts", {
//             id,
//             name,
//             description,
//             userId: req.userId,
//         });

//         if (response.data) {
//             res.status(200).json({
//                 message: `Posts ${id} added successfully`,
//             });
//         }
//     } catch (error) {
//         res.status(500).json({
//             message: "Something went wrong while adding post",
//         });
//     }

// });

// app.get("/posts", verifyToken, async (req, res) => {
//     try {
//         const postsData = await axios.get("http://localhost:3000/posts");

//         res.status(200).json({
//           message: "Posts sends successfully",
//           postsData: postsData.data,
//         });
//     } catch (error) {
//         res.status(500).json({
//           message: "Something went wrong while fetching posts data",
//         });
//     }
// });

// app.get("/posts/:id", verifyToken, async (req, res) => {
//     const { id } = req.params;
//     try {
//         const postsData = await axios.get("http://localhost:3000/posts");
//         const filteredData = postsData.data.filter((post) => post.id === id )
//         if (filteredData.length > 0) {
//             res.status(200).json({
//                 message: `Post ${id} sends successfully`,
//                 filteredData,
//             });
//         } else {
//             res.status(404).json({
//               message: `Post ${id} not found`,
//             });
//         }
//     } catch (error) {
//         res.status(500).json({
//           message: `Post data with ${id} doesn't exits`,
//         });
//     }
// });

// app.post('/user/register', async(req, res) => {
//     let { name, email, password } = req.body;
//     try {
//         const userData = await axios.get("http://localhost:3000/users");

//         const emailRegx = /^[\w\.-]+@[a-zA-Z0-9\.-]+\.[a-zA-Z]{2,}$/;

//         const isValidEmail = emailRegx.test(email)

//         if (!isValidEmail) {
//             return res.status(422).json({
//               message: `Please enter valid email`,
//             });
//         }

//         const userExists = userData.data.find((data) => data.email === email);
//         if (userExists) {
//           return res.status(409).json({
//             message: `User ${email} is already in use`,
//           });
//         }
//         let registerUser = await axios.post('http://localhost:3000/users', { name, email, password });

//         res.status(200).json({
//             message: 'User registered successfully',
//             registerUser : registerUser.data
//         })
//     } catch (err) {
//         console.log('err', err)
//         res.status(500).json({
//           message: "Something went wrong while registering user",
//         });
//     }

// })

// app.post('/user/login',  async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const registeredUsers = await axios.get('http://localhost:3000/users')
//         let userExists = registeredUsers.data.find((user) => user.email === email);

//         const token = jwt.sign(
//           { userId: userExists.id },
//           process.env.JWT_SECRET,
//           {
//             expiresIn: "1h",
//           }
//         );

//         if (!userExists) {
//             return res.status(404).json({
//                 message: "User not found with given email",
//             });
//         } else if (userExists.password !== password) {
//             return res.status(401).json({
//                 message: "Password does not match",
//             });
//         } else {
//             return res.status(200).json({
//               message: "User logged in successfully",
//               token,
//             });
//         }

//     } catch (err) {
//         console.log('err', err)
//         res.status(500).json({
//           message: "Something went wrong while user login",
//         });
//     }
// })

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})
