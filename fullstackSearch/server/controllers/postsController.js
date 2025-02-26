import {hasDuplicateImg } from "../utils.js";

export const addPosts = async (req, res) => {
  const { title, body } = req.body;
  const userId = req.userId;
  try {
    const query = `INSERT INTO posts (title, body, user_id, post_status) VALUES (?, ?, ?, ?)`;

    const [result] = await req.dbConnection.execute(query, [
      title,
      body,
      userId,
      "Draft",
    ]);

    if (result.affectedRows > 0) {
      return res.status(201).json({
        message: `Posts ${result.insertId} added successfully`,
        postId: result.insertId,
      });
    }
     return res.status(400).json({ message: "Failed to add post" });


  } catch (error) {
    console.log("Add Post Error", error);
    res.status(500).json({
      message: "Something went wrong while adding post",
    });
  }
};

export const approvePost = async (req, res) => {
    const { postId, postStatus } = req.body;
    const userId = req.userId;
    const selectQuery = 'select * from users where id= ?';
    try {
        const [result] = await req.dbConnection.query(selectQuery, [userId]);
        console.log("result", result, userId);
        if (result[0].user_role === 'moderator') {
            const [result] = await req.dbConnection.query('update posts SET post_status = ? where id = ?', [postStatus, postId]);

            console.log('result inside try', result)

            if (result.affectedRows > 0) {
                return res.status(201).json({
                    message: `Post ${postId} approved successfully`,
                    postId: postId,
                });
            }
        }
    } catch (error) {
        console.log("Approve Post Error", error);
        res.status(500).json({
            message: "Something went wrong while approving user",
        });
    }
}

export const editPost = async (req, res) => {
    const { id: postId } = req.params;
    const { title, body } = req.body;
    const userId = req.userId;

    const [postData] =  await req.dbConnection.query(
        "SELECT * FROM Posts WHERE id = ?",
        [postId]
    );

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

export const editComment = async(req, res) => {
    const { description, commentId } = req.body;
    const userId = req.userId;

     const [userData] = await req.dbConnection.query(
       "SELECT * FROM Users WHERE id = ?",
       [userId]
     );

    const [commentData] = await req.dbConnection.query('Select * from comments where id = ?', [commentId])

    console.log("commentData", commentData);
     const isAdmin = userData[0].user_role === "admin" ? true : false;
    const canEdit = isAdmin || commentData.user_id === userId;

    const query = "Update comments SET description = ? WHERE id = ?";
    try {
        if (canEdit) {
            const [result] = await req.dbConnection.query(query, [
                description,
                commentId,
            ]);
            console.log('result', result)
            if (result.affectedRows > 0) {
                res.status(200).json({
                    message: `Comment ${commentId} edited successfully`
                })
            }
        } else {
            res.status(401).json({
              message: `You are not authorized to edit the comment`,
            });
        }
    } catch (err) {
        console.log('Comment Error', err)
        return res.status(500).json({
          message: "Something went wrong while editing the comment",
        });
    }
}

export const deleteComment = async (req, res) => {
  const { commentId } = req.body;
  const userId = req.userId;

  const [userData] = await req.dbConnection.query(
    "SELECT * FROM Users WHERE id = ?",
    [userId]
  );

  const [commentData] = await req.dbConnection.query(
    "Select * from comments where id = ?",
    [commentId]
  );

  const isAdmin = userData[0].user_role === "admin" ? true : false;
  const canDelete = isAdmin || commentData.user_id === userId;

  const query = "delete from comments WHERE id = ?";
  try {
    if (canDelete) {
      const [result] = await req.dbConnection.query(query, [
        commentId,
      ]);

      if (result.affectedRows > 0) {
        res.status(200).json({
          message: `Comment ${commentId} deleted successfully`,
        });
      }
    } else {
      res.status(401).json({
        message: `You are not authorized to delete the comment`,
      });
    }
  } catch (err) {
      console.log("Comment Error", err);
      return res.status(500).json({
        message: "Something went wrong while deleting the comment",
      });
  }
};

export const likesPost = async (req, res) => {
  const { postId } = req.body;
  const userId = req.userId;
  const insertQuery =
      "INSERT INTO Likes_posts (liked_by_id, liked_to_post_id) VALUES (?,?)";
    const selectQuery =
        "select * from likes_posts where liked_by_id = ? and liked_to_post_id =?";
    const deleteQuery =
        "delete from likes_posts where liked_by_id= ? and liked_to_post_id =?";
    let message;
  try {
      const [result] = await req.dbConnection.execute(selectQuery, [userId, postId]);
      if (result.length > 0) {
          await req.dbConnection.execute(deleteQuery, [
              userId,
              postId,
          ]);
        message = 'Post unliked successfully'
      } else {
          await req.dbConnection.execute(insertQuery, [userId, postId]);
           message = "Post liked successfully";
      }

    return res.status(200).json({
      message,
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
    const insertQuery =
      "INSERT INTO Likes_comments (liked_by_id, liked_to_comment_id) VALUES (?,?)";
    const selectQuery =
      "select * from Likes_comments where liked_by_id = ? and liked_to_comment_id =?";
    const deleteQuery =
      "delete from Likes_comments where liked_by_id= ? and liked_to_comment_id =?";
    let message;
  try {
      const [result] = await req.dbConnection.execute(selectQuery, [
        userId,
        commentId,
      ]);
      if (result.length > 0) {
        await req.dbConnection.execute(deleteQuery, [userId, commentId]);
        message = "Comment unliked successfully";
      } else {
        await req.dbConnection.execute(insertQuery, [userId, commentId]);
        message = "Comment liked successfully";
      }

      return res.status(200).json({
        message,
        userId,
        commentId,
      });

  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong while liking the comment",
    });
  }
};

const addPostImages = async (req, edit) => {
  const { postId } = req.body;
  const query = "INSERT INTO post_images (post_id, image_url) VALUES (?, ?)";
  const image_urls = [];
  const executeConnection = req.dbConnection;
  let dbConnection;

  // Check if there are any files uploaded
  if (!req.files || req.files.length === 0) {
    return {
      status: 400,
      message: "No images uploaded. Please upload at least one image.",
    };
  }

  // Process the uploaded files
  req.files.forEach((file) => {
    const imagePath = file.path.replace(/\\/g, "/"); // Correct file path format
    const imageUrl = `http://localhost:8000/${imagePath}`;
    image_urls.push(imageUrl);
  });

  if (hasDuplicateImg(image_urls)) {
    return { status: 409, message: "Duplicate items found" };
  }

  try {
    dbConnection = await executeConnection.getConnection();

    // Insert the images into the database
    const insertPromises = image_urls.map(async (imageUrl) => {
      return await dbConnection.execute(query, [postId, imageUrl]);
    });

    await Promise.all(insertPromises);

    // Return success message and image URLs
    return {
      status: 200,
      message: edit
        ? "Post images edited successfully"
        : "Post images added successfully",
      image_urls,
      postId,
    };
  } catch (error) {
    console.log("add/edit images error:", error);
    // Handle error gracefully
    return {
      status: 500,
      message: "An error occurred while adding/editing images.",
    };
  }
};

// postImages function (only adds images)
export const postImages = async (req, res) => {
    try {
        const imgResp = await addPostImages(req)
        const { status, message, image_urls, postId} = imgResp
        return res.status(status).json({
          message,
          image_urls,
          postId,
        });
  } catch (err) {
    console.error("Error adding post images:", err);
    return res.status(500).json({
      message: "Something went wrong while adding post images",
    });
  }
};

// editPostImages function (handles deletion and image addition)
export const editPostImages = async (req, res) => {
  const { deletionDetails } = req.body;
    const imageIds = deletionDetails && JSON.parse(deletionDetails);
    const connection = await req.dbConnection.getConnection();
    let imgResp;
    const resObj = {};

  try {
    await connection.beginTransaction();

    // Step 1: Delete images
    if (imageIds.length > 0) {
      const deleteQuery = `DELETE FROM post_images WHERE id IN (${imageIds
        .map(() => "?")
        .join(", ")})`;
      const [result] = await connection.execute(deleteQuery, [...imageIds]);

      resObj.deleteMessage = {
        imageIds,
      };
    }

    // Step 2: Add new images (if any uploaded)
    if (req.files && req.files.length > 0) {
      imgResp = await addPostImages(req, true);
      if (imgResp) {
        const { status, message, image_urls, postId } = imgResp;
        resObj.editMessage = {
          status,
          message,
          image_urls,
          postId,
        };
      }
    }

    if (Object.keys(resObj).length === 0) {
      return res.status(404).json({
        message: "No info found for delete or edit images",
      });
    }

    const status = imgResp ? imgResp.status : 200;

    if (status === 409) {
      await connection.rollback();
      return res.status(409).json({
        message: "Duplicate images found",
      });
    }
    // Step 3: Commit the transaction if everything was successful
      await connection.commit();

    return res.status(status).json({
      resObj,
    });

  } catch (err) {
    await connection.rollback(); // Rollback if an error occurs
    console.error("Error editing post images:", err);
    return res.status(500).json({
        message: "Something went wrong while editing post images",
    });
  } finally {
    connection.release();
  }
};

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
