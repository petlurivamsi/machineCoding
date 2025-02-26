import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
  if (
    !firstName ||
    !lastName ||
    !username ||
    !email ||
    !school ||
    !mobile ||
    !dob
  ) {
    return res.status(400).json({
      message: "All required fields must be provided.",
    });
  }
  try {
    const [userData] = await req.dbConnection.query("Select * from users");

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
    const hashedPassword = await bcrypt.hash(hashed_password, 10);
    console.log("hashedPassword", hashedPassword);
    const query = `INSERT INTO Users (firstName, lastName, username, email, user_role, hashed_password, school, mobile, dob, user_profile_pic)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await req.dbConnection.query(query, [
      firstName,
      lastName,
      username,
      email,
      user_role,
      hashedPassword,
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

export const editUserProfile = async (req, res) => {
  const { id: userId } = req.params;
  const {
    firstName,
    lastName,
    username,
    email,
    user_role,
    school,
    mobile,
    dob,
  } = req.body;

  // If the user uploaded a new profile picture, get the path
  const user_profile_pic = req.file ? req.file.path : null;
  //const formattedDob = new Date(dob).toISOString().split("T")[0];

  // If a new image path is provided, format it properly
  const imageUrl = user_profile_pic
    ? `http://localhost:8000/${user_profile_pic.replace(/\\/g, "/")}`
    : null;

  // Validate required fields (skip some fields if they are not provided in the request)
  if (
    !firstName ||
    !lastName ||
    !username ||
    !email ||
    !school ||
    !mobile ||
    !dob
  ) {
    return res.status(400).json({
      message: "All required fields must be provided.",
    });
  }

  // Validate email format
  const emailRegx = /^[\w\.-]+@[a-zA-Z0-9\.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegx.test(email)) {
    return res.status(422).json({
      message: "Please enter a valid email address.",
    });
  }

  try {
    // Check if the email is being updated, and if so, check if another user already has this email
    let emailCheckQuery = "SELECT * FROM Users WHERE email = ? AND id != ?";
    const [emailExists] = await req.dbConnection.query(emailCheckQuery, [
      email,
      userId,
    ]);

    if (emailExists.length > 0) {
      return res.status(409).json({
        message: `The email ${email} is already taken by another user.`,
      });
    }

    // Prepare update query
    let updateQuery = `
      UPDATE Users SET
        firstName = ?,
        lastName = ?,
        username = ?,
        email = ?,
        user_role = ?,
        school = ?,
        mobile = ?,
        dob = ?,
        user_profile_pic = ?
      WHERE id = ?
    `;

    // If no new profile picture is uploaded, pass the current value
    const [result] = await req.dbConnection.query(updateQuery, [
      firstName,
      lastName,
      username,
      email,
      user_role,
      school,
      mobile,
      //formattedDob,
      dob,
      imageUrl || null, // If no new image, keep it null
      userId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "User not found or no changes made.",
      });
    }

    // Fetch the updated user information (excluding password)
    const [updatedUser] = await req.dbConnection.query(
      "SELECT id, firstName, lastName, username, email, user_role, school, mobile, dob, user_profile_pic FROM Users WHERE id = ?",
      [userId]
    );

    return res.status(200).json({
      message: "User updated successfully",
      updatedUser: updatedUser[0],
    });
  } catch (err) {
    console.log("Error updating user:", err);
    return res.status(500).json({
      message: "Something went wrong while updating the user.",
    });
  }
};

export const deleteUserProfile = async (req, res) => {
  const { id } = req.body;
  const userId = req.userId;

  const [userData] = await req.dbConnection.query(
    "select * from users where id = ?",
    [userId]
  );

  const isAdmin = userData[0].user_role === "admin" ? true : false;
  const canDelete = isAdmin || userId === id;

  try {
    if (canDelete) {
      const [result] = await req.dbConnection.query(
        "delete from users where id = ? ",
        [id]
      );
      if (result.affectedRows > 0) {
        return res.status(200).json({
          message: `User id ${id} deleted successfully`,
        });
      }
    } else {
      return res.status(401).json({
        message: `User is not authorized to delete`,
      });
    }
  } catch (err) {
    console.log("Delete user profile", err);
    return res.status(500).json({
      message: "Something went wrong while deleting user profile",
    });
  }
};

export const userLogin = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //const registeredUsers = await axios.get("http://localhost:3000/users");
    const [registeredUsers] = await req.dbConnection.query(
      "SELECT * FROM Users WHERE email = ?",
      [email]
    );
    let userExists = registeredUsers.find((user) => user.email === email);

    const token = jwt.sign({ userId: userExists.id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    const matchPassword = await bcrypt.compare(
      password,
      userExists.hashed_password
    );

    if (!userExists) {
      return res.status(404).json({
        message: "User not found with given email",
      });
    } else if (!matchPassword) {
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
    return res.status(500).json({
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

export const followers = async (req, res) => {
  const { followingUserId } = req.body;
  const followedByUserId = req.userId;

  const insertQuery =
    "INSERT INTO Followers (followed_by_user_id, following_user_id) VALUES (?,?)";
  const selectQuery =
    "select * from Followers where followed_by_user_id = ? and following_user_id =?";
  const deleteQuery =
    "delete from Followers where followed_by_user_id= ? and following_user_id =?";
  let message;
  try {
    const [result] = await req.dbConnection.execute(selectQuery, [
      followedByUserId,
      followingUserId,
    ]);
    if (result.length > 0) {
      await req.dbConnection.execute(deleteQuery, [
        followedByUserId,
        followingUserId,
      ]);
      message = `User id ${followingUserId} unfollowed successfully`;
    } else {
      await req.dbConnection.execute(insertQuery, [
        followedByUserId,
        followingUserId,
      ]);
      message = `User id ${followingUserId} followed successfully`;
    }

    return res.status(200).json({
      message,
      followedByUserId,
      followingUserId,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({
      message: "Something went wrong while following to user",
    });
  }
};

export const blockedUser = async (req, res) => {
  const { blockedUserId } = req.body;
  const userId = req.userId;
  const insertQuery =
    "INSERT INTO blockedUsers (user_id, blocked_user_id) VALUES (?,?)";
  const selectQuery =
    "select * from blockedUsers where user_id = ? and blocked_user_id =?";
  const deleteQuery =
    "delete from blockedUsers where user_id= ? and blocked_user_id =?";
  let message;
  try {
    const [result] = await req.dbConnection.execute(selectQuery, [
      userId,
      blockedUserId,
    ]);
    if (result.length > 0) {
      await req.dbConnection.execute(deleteQuery, [userId, blockedUserId]);
      message = `User id ${blockedUserId} blocked successfully`;
    } else {
      await req.dbConnection.execute(insertQuery, [userId, blockedUserId]);
      message = `User id ${blockedUserId} unblocked successfully`;
    }

    return res.status(200).json({
      message,
      userId,
      blockedUserId,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({
      message: "Something went wrong while blocking the user",
    });
  }
};
