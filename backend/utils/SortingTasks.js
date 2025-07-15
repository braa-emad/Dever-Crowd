const sortRawTasks = (tasksInput) => {
  const priorityOrder = { high: 1, medium: 2, low: 3 };

  const tasksArray = Array.isArray(tasksInput) ? tasksInput : [tasksInput];

  return tasksArray.sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

module.exports = sortRawTasks;
