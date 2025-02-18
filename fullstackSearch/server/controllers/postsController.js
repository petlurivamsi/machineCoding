export const addPosts = async (req, res) => {
  const { title, body } = req.body;
  const userId = req.userId;
  try {
    const query = `INSERT INTO posts (title, body, user_id, post_status) VALUES (?, ?, ?, ?)`;

    const [result] = await req.dbConnection.execute(query, [
      title,
      body,
      userId,
      "live",
    ]);

    if (result.affectedRows > 0) {
      return res.status(201).json({
        message: `Posts ${result.insertId} added successfully`,
        postId: result.insertId,
      });
    }
     return res.status(400).json({ message: "Failed to add post" });


  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      message: "Something went wrong while adding post",
    });
  }
};

export const editPost = async (req, res) => {
    const { id: postId } = req.params;
    const { title, body } = req.body;
    const userId = req.userId;

    const [postData] =  await req.dbConnection.query(
        "SELECT * FROM Posts WHERE id = ?",
        [postId]
    );

    // if the logged in user is owner of the post then he can edit
    // else if logged in user is admin then he can edit the post

    // this call is only for to check if user is admin or not
     const [userData] = await req.dbConnection.query(
       "SELECT * FROM Users WHERE id = ?",
       [userId]
     );
    const isAdmin = userData[0].user_role === 'admin' ? true : false;
    const canEdit = isAdmin || postData.user_id === userId;
    console.log("postData", postData);

  // Prepare update query
  let updatePostQuery = `
      UPDATE Posts SET
        title = ?,
        body = ?
      WHERE id = ?
    `;

    try {
        if (canEdit) {
            const [result] = await req.dbConnection.query(updatePostQuery, [
                title,
                body,
                postId,
            ]);
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Post not found or no changes made.",
                });
            }

            const [updatedPost] = await req.dbConnection.query(
                "SELECT id, title, body FROM Posts WHERE id = ?",
                [postId]
            );

            return res.status(200).json({
                message: "Post updated successfully",
                updatedPost: updatedPost[0],
            });
        }
         return res.status(500).json({
           message: "Authenticated user or admin can only edit the post",
         });
    } catch (err) {
      console.log("Error updating post:", err);
      return res.status(500).json({
        message: "Something went wrong while updating the post.",
      });
    }

}

export const deletePost = async (req, res) => {
  const { id: postId } = req.params;
  const userId = req.userId;
  try {
    const [postData] = await req.dbConnection.query(
      "SELECT * FROM Posts WHERE id = ?",
      [postId]
    );
    const [userData] = await req.dbConnection.query(
      "SELECT * FROM Users WHERE id = ?",
      [userId]
    );
    const isAdmin = userData[0].user_role === "admin" ? true : false;
    const canDelete = isAdmin || postData.user_id === userId;

    if (!canDelete) {
      return res.status(500).json({
        message: "Authenticated user or admin can only delete the post",
      });
    }
    if (postData.length === 0) {
          return res.status(404).json({
            message: "Post does not exists",
          });
      }

    let deletePostQuery = `delete from Posts where id = ?`;
    const [result] = await req.dbConnection.query(deletePostQuery, [postId]);
    if (result.affectedRows > 0) {
      return res.status(200).json({
        message: `Post ${postId} has been deleted successfully`,
      });
    }
  } catch (err) {
    console.log("Error deleting post:", err);
    return res.status(500).json({
      message: "Something went wrong while deleting the post.",
    });
  }
}

export const getAllPosts = async (req, res) => {
  try {
    const [postsData] = await req.dbConnection.query("Select * from posts");
    res.status(200).json({
      message: "All posts retrieved successfully",
      postsData: postsData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while fetching posts data",
    });
  }
};

export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const [postsData] = await req.dbConnection.query(
      `Select * from posts Where id = ?`,
      [id]
    );

    const filteredData = postsData.filter((post) => post.id === parseInt(id));

    if (filteredData.length > 0) {
      res.status(200).json({
        message: `Post ${id} sends successfully`,
        filteredData,
      });
    } else {
      res.status(404).json({
        message: `Post ${id} not found`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Post data with ${id} doesn't exits`,
    });
  }
};

//edit images
//delete images

export const addComment = async (req, res) => {
  const { description, postId, parentCommentId } = req.body;
  const userId = req.userId;

  const query = parentCommentId
    ? `INSERT INTO comments (description, post_id, user_id, parent_comment_id) VALUES (?, ?, ?, ?)`
    : `INSERT INTO comments (description, post_id, user_id) VALUES (?, ?, ?)`;

  const params = parentCommentId
    ? [description, postId, userId, parentCommentId]
    : [description, postId, userId];

  try {
    const [result] = await req.dbConnection.execute(query, params);
    return res.status(200).json({
      id: result.insertId,
      message: "Comment added successfully",
    });
  } catch (err) {
    console.log("err post", err);
    return res.status(500).json({
      message: "Something went wrong while adding comment",
    });
  }
};

export const likesPost = async (req, res) => {
  const { postId } = req.body;
  const userId = req.userId;
  const query =
    "INSERT INTO Likes_posts (liked_by_id, liked_to_post_id) VALUES (?,?)";
  try {
    await req.dbConnection.execute(query, [userId, postId]);
    return res.status(200).json({
      message: `Liked to post Successfully`,
      userId,
      postId,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong while liking the post",
    });
  }
};

export const likesComment = async (req, res) => {
  const { commentId } = req.body;
  const userId = req.userId;
  const query =
    "INSERT INTO Likes_comments (liked_by_id, liked_to_comment_id) VALUES (?,?)";
  try {
    await req.dbConnection.execute(query, [userId, commentId]);
    return res.status(200).json({
      message: `Liked to comment Successfully`,
      userId,
      commentId,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong while liking the comment",
    });
  }
};

export const postImages = async (req, res) => {
  const { postId } = req.body;
  const query = "Insert Into post_images (post_id, image_url) values(?,?)";
  const image_urls = [];
  req.files.forEach((file) => {
    const imagePath = file.path.replace(/\\/g, "/"); // Correct file path format
    const imageUrl = `http://localhost:8000/${imagePath}`;
    image_urls.push(imageUrl);
  });

  try {
    const insertPromises = image_urls.map(async (imageUrl) => {
      return req.dbConnection.query(query, [postId, imageUrl]);
    });

    await Promise.all(insertPromises);

    return res.status(200).json({
      message: `Post image added Successfully`,
      image_urls,
      postId,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong while adding post images",
    });
  }
};

export const editPostImages = async (req, res) => {

}

export const displayPosts = async (req, res) => {
    const { userId, type } = req.query;

  const loggedInUserId = req.userId;
    let followingUserResult = [];

  if (type === "timeline") {
    const followersQuery = `select following_user_id from followers where followed_by_user_id=?`;
    try {
      const [result] = await req.dbConnection.execute(followersQuery, [
        loggedInUserId,
      ]);
      for (let val of result) {
        followingUserResult.push(val["following_user_id"]);
      }
    } catch (error) {
      console.log("err", err);
    }
  } else {
      followingUserResult.push(userId);
  }

  const userInfo =
    type === "timeline"
      ? `${"?".repeat(followingUserResult.length).split("")}`
      : "?";

     const postQuery = `
        SELECT
            posts.id,
            posts.title,
            posts.user_id,
            posts.body,
            posts.created_at,
            users.firstName,
            users.lastName,
            users.username,
            users.user_role,
            users.school,
            users.dob,
            users.user_profile_pic,
            GROUP_CONCAT(post_images.image_url) AS image_urls
        FROM
            posts
        LEFT JOIN
            post_images ON posts.id = post_images.post_id
        LEFT JOIN
            users ON posts.user_id = users.id
        WHERE
            posts.user_id IN (${userInfo})
        GROUP BY
            posts.id
    `;


  console.log("postQuery", postQuery);

  try {
    const [result] = await req.dbConnection.execute(postQuery, [
      ...followingUserResult,
    ]);

    return res.status(200).json({
      result,
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({
      message: "Something went wrong while displaying posts",
    });
  }
};
