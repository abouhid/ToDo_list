const toDoList = (title, list = []) => ({ title, list });

const task = (title, desc, dueDate, priority, status = false) => ({
  title, desc, dueDate, priority, status,
});

export { toDoList, task };