const sortRawBlogs = (tasksInput) => {
  const tasksArray = Array.isArray(tasksInput) ? tasksInput : [tasksInput];
  return tasksArray.sort((a, b) => 
    a.views - b.views
  );
};

module.exports = sortRawBlogs;
