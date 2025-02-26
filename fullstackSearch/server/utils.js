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
