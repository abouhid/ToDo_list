const submit = document.getElementById("submit");
const form = document.getElementById("book-form");

const main = document.querySelector("main");

const toDoList = (title, list = []) => {
  return { title, list };
};

const task = (title) => {
  return { title };
};

export { toDoList, task };