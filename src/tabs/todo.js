import { render } from "../index";

const submit = document.getElementById("submit");
const form = document.getElementById("book-form");

const main = document.querySelector("main");

const toDoList = (title, list = []) => {
  // const add = (obj) => {
  //   const newTaskInput = document.getElementById("task-input").value;
  //   const newTask = task(newTaskInput);
  //   this.list.push(newTask);
  // };

  return { title, list };
};

const task = (title) => {
  return { title };
};
