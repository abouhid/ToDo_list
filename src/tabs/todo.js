const toDoList = (title, list = []) => {
  return { title, list };
};

const task = (title, desc, priority, dueDate) => {
  return { title, desc, priority, dueDate };
};

export { toDoList, task };