const toDoList = (title, list = []) => {
  return { title, list };
};

const task = (title, desc, priority, dueDate, status = false) => {
  return { title, desc, priority, dueDate, status };
};

export { toDoList, task };