const toDoList = (title, list = []) => {
  return { title, list };
};

const task = (title, desc, dueDate, priority, status = false) => {
  return { title, desc, dueDate, priority, status };
};

export { toDoList, task };