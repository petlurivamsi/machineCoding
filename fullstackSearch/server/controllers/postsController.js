import axios from "axios";

export const addPosts = async (req, res) => {
  const { id, name, description } = req.body;
  try {
    const postsData = await axios.get("http://localhost:3000/posts");
    const dataExists = postsData.data.find((data) => data.id === id);
    if (dataExists) {
      return res.status(409).json({
        message: `Post ${id} already exists`,
      });
    }
    const response = await axios.post("http://localhost:3000/posts", {
      id,
      name,
      description,
      userId: req.userId,
    });

    if (response.data) {
      res.status(200).json({
        message: `Posts ${id} added successfully`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while adding post",
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const postsData = await axios.get("http://localhost:3000/posts");

    res.status(200).json({
      message: "Posts sends successfully",
      postsData: postsData.data,
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
    const postsData = await axios.get("http://localhost:3000/posts");
    const filteredData = postsData.data.filter((post) => post.id === id);
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
