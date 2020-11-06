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
  const dtask1 = task('The Winds of Winter', 'desc1', '2020-12-12', 'high');
  const dtask2 = task('A Dream of Spring', 'desc1', '2020-12-12', 'high');
  const dtask3 = task('A Clash of Kings', 'desc1', '2020-12-12', 'high');
  const dtask4 = task('A Game of Thrones', 'desc1', '2020-12-12', 'high');
  const dTodoList1 = toDoList('A Song of Ice and Fire');
  const dTodoList2 = toDoList('The Lord of the Rings');
  const dtask5 = task('The Two Towers', 'desc1', '2020-12-12', 'high');
  
  
  dTodoList1.list.push(dtask1, dtask2, dtask3, dtask4);
  dTodoList2.list.push(dtask5);

  projectsList.push(dTodoList1);
  projectsList.push(dTodoList2);
};

const renderTasks = (obj) => {
  while (tasksList.firstChild) {
    tasksList.removeChild(tasksList.firstChild);
  }

  for (let i = 0; i < obj.list.length; i += 1) {
    const taskContainer = document.createElement('div');
    const title = document.createElement('h3');
    const detailsContainer = document.createElement("div");
    const desc = document.createElement("p");
    const date = document.createElement("p");
    const priority = document.createElement("p");
    const showBtn = addShowDetailsBtn(detailsContainer);
    const deleteTaskBtn = addDeleteTaskBtn(obj,i);

    title.textContent = obj.list[i].title;
    desc.textContent = obj.list[i].desc;
    date.textContent = obj.list[i].dueDate;
    priority.textContent = obj.list[i].priority;

    detailsContainer.style.display = "none";

    taskContainer.appendChild(title);
    taskContainer.appendChild(showBtn);
    taskContainer.appendChild(deleteTaskBtn);
    detailsContainer.appendChild(desc);
    detailsContainer.appendChild(priority);
    detailsContainer.appendChild(date);
    taskContainer.appendChild(detailsContainer);
    tasksList.appendChild(taskContainer);
  }
}

const addNewTask = (obj) => {
  const taskTitleInput = document.getElementById("task-input").value;
  const taskDescInput = document.getElementById("task-desc-input").value;
  const taskDateInput = document.getElementById("task-date-input").value;
  const taskPriorityInput = document.getElementById("task-priority-input").value;
  
  const newTask = task(taskTitleInput, taskDescInput, taskDateInput, taskPriorityInput);
  form.reset();
  obj.list.unshift(newTask);
};

const addShowDetailsBtn = (container) => {
  const chevron = document.createElement('span');
  chevron.textContent = "⌄";

  chevron.addEventListener("click", (e) => {
    e.preventDefault();
    if (container.style.display === "block") container.style.display = "none";
    else container.style.display = "block";
  });

  return chevron;
}

const addDeleteTaskBtn = (obj,i) => {
  const deleteBtn = document.createElement('button');

  deleteBtn.textContent = 'Delete';

  deleteBtn.addEventListener('click', () => {
 
    obj.list.splice(i, 1);
    renderTasks(obj);
    // saveLocalStorage();
  });

  return deleteBtn;

}

submit.addEventListener('click', (e) => {
  e.preventDefault();
  let active = document.querySelector('.active').innerText;
  let current_project = projectsList.filter(obj => obj.title === active)[0];
  addNewTask(current_project);
  renderTasks(current_project);
});

const renderLists = (projectsList) => {
  while (projectsListContainer.firstChild) {
    projectsListContainer.removeChild(projectsListContainer.firstChild);
  }

  for (let i = 0; i < projectsList.length; i += 1) {


    const title = document.createElement('h3');
    title.textContent = projectsList[i].title;
    projectsListContainer.appendChild(title);

    if (projectsList[0] && i===0) {
      title.classList.add('active')
    };

    title.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.active').classList.remove('active');
      title.classList.add('active')
      renderTasks(projectsList[i]);
    });
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


defaultTasks();
renderLists(projectsList);
renderTasks(projectsList[0]);