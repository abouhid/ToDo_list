import { toDoList, task } from './tabs/todo'

const submit = document.getElementById('submit');
const sidebar_submit = document.getElementById('sidebar-submit');
const main = document.querySelector('main')
const sidebar = document.querySelector('sidebar')
const tasksList = document.querySelector('.tasks-list')
const projectsListContainer = document.querySelector('.project-names')
const form = document.getElementById("book-form");
const sidebar_form = document.getElementById("sidebar-form");

const projectsList = []


const defaultTasks = () => {
  const dtask1 = task('The Winds of Winter');
  const dtask2 = task('A Dream of Spring');
  const dtask3 = task('A Clash of Kings');
  const dtask4 = task('A Game of Thrones');
  const dTodoList1 = toDoList('A Song of Ice and Fire');
  
  dTodoList1.list.push(dtask1, dtask2, dtask3, dtask4);
  projectsList.unshift(dTodoList1);
  console.log(projectsList);

  return dTodoList1;
};

const renderTasks = (obj) => {
  while (tasksList.firstChild) {
    tasksList.removeChild(tasksList.firstChild);
  }

  for (let i = 0; i < obj.list.length; i += 1) {
    const taskContainer = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = obj.list[i].title;
    taskContainer.appendChild(title);
    tasksList.appendChild(taskContainer);
  }
}

const addNewTask = (obj) => {
  const newTaskInput = document.getElementById("task-input").value;
  const newTask = task(newTaskInput);
  form.reset();
  obj.list.unshift(newTask);
};

submit.addEventListener('click', (e) => {
  e.preventDefault();
  addNewTask(defaultInputs);
  renderTasks(defaultInputs);
});

const renderLists = (projectsList) => {
  while (projectsListContainer.firstChild) {
    projectsListContainer.removeChild(projectsListContainer.firstChild);
  }

  for (let i = 0; i < projectsList.length; i += 1) {

    const title = document.createElement('h3');
    title.textContent = projectsList[i].title;
    projectsListContainer.appendChild(title);
  }
}

const addNewList = (obj) => {
  const newListInput = document.getElementById("sidebar-input").value;
  const newList = toDoList(newListInput);
  sidebar_form.reset();
  obj.unshift(newList);
};

sidebar_submit.addEventListener('click', (e) => {
  e.preventDefault();
  addNewList(projectsList);
  renderLists(projectsList);
});


const defaultInputs = defaultTasks();
renderLists(projectsList);

renderTasks(defaultInputs);
