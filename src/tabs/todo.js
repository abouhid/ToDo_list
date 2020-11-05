import { render } from "../index";

const submit = document.getElementById("submit");
const form = document.getElementById("book-form");

const main = document.querySelector("main");

const toDoList = (title) => {
  const self = { title };
  self.list = [];

  const toDoListMethods = (self) => ({
    add: () => {
      const newTaskInput = document.getElementById("task-input").value;
      const newTask = task(newTaskInput);
      self.list.push(newTask);
      render(self);
    },
  });

  return Object.assign(self, toDoListMethods);
};

const task = (title) => {
  const self = { title };

  return Object.assign(self);
};

export { toDoList, task };
