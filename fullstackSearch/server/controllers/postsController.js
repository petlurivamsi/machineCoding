import axios from "axios";

export const addPosts = async (req, res) => {
    const { title, body} = req.body;
    const userId = req.userId;
    try {

        const query = `INSERT INTO posts (title, body, user_id, post_status) VALUES (?, ?, ?, ?)`;

        const [result] = await req.dbConnection.execute(query, [
          title,
          body,
          userId,
          "live",
        ]);

    if (result) {
      res.status(200).json({
        message: `Posts ${result.insertId} added successfully`,
      });
    }
    } catch (error) {
        console.log('error', error)
        res.status(500).json({
        message: "Something went wrong while adding post",
        });
    }
};

export const getAllPosts = async (req, res) => {
    try {
    const [postsData] = await req.dbConnection.query('Select * from posts');
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
      const [postsData] = await req.dbConnection.query(`Select * from posts Where id = ?`, [id]);

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

//export const replyToComment = async ()
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
    return res.status(500).json({
      message: "Something went wrong while adding comment",
    });
  }
};

