export const addPostImages = async (req, res, edit) => {
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
        status:200,
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

// Check for duplicates
export const hasDuplicateImg = (image_urls) => {
  return (
    Object.keys(
      image_urls.reduce((acc, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
      }, {})
    ).filter((item) => {
      return image_urls.filter((name) => name === item).length > 1;
    }).length > 0
  );
};

//Second Approach
// export const hasDuplicateImg = (images) => {
//   const set = new Set();
//   for (let image of images) {
//     if (set.has(image)) {
//       return true;
//     }
//     set.add(image);
//   }
//   return false;
// };
