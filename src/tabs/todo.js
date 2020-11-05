const toDoList = (title, list = []) => {
  return { title, list };
};

const task = (title) => {
  return { title };
};

export { toDoList, task };