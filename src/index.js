import {ToDoList,Task} from './tabs/todo.js'

const main = document.querySelector('main')

const defaultTasks = () => {
  // const dtask1 = new Task('The Winds of Winter');
  // const dtask2 = new Task('A Dream of Spring');
  // const dtask3 = new Task('A Clash of Kings');
  // const dtask4 = new Task('A Game of Thrones');
   const dTodoList1 = new ToDoList('A Song of Ice and Fire');
  
  return dTodoList1
};
  
  console.log(defaultTasks())
// main.appendChild(defaultTasks())
// document.body.appendChild(main);