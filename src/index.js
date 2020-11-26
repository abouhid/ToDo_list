import './styles/reset.css';
import './styles/style.css';

import { // eslint-disable-line import/no-cycle
  addEditTaskBtn,
  addDeleteTaskBtn,
  addCheckbox,
  addDeleteListBtn,
  saveLocalStorage,
  projectsList,
} from './modules/events';

import {
  task,
  toDoList,
  addNewTask,
  addNewList,
  newListInput,
} from './modules/factoryFunc';

import {
  stylesToPriority,
  formatDate,
  openModal,
  appendDone,
  newTaskValidation,
  newListValidation,
  addShowDetailsBtn,
  modal,
  addIcon,
  addLogo,
  advButtonEvent,
} from './modules/helper';


const form = document.getElementById('task-form');
const submit = document.getElementById('submit');
const tasksList = document.querySelector('.tasks-list');
const doneList = document.querySelector('.done-list');
const sidebarForm = document.getElementById('sidebar-form');
const sidebarSubmit = document.getElementById('sidebar-submit');
const projectsListContainer = document.querySelector('.project-names');
const sidebar = document.querySelector('.sidebar');
const advButton = document.querySelector('.advButton');
const advOptions = document.querySelector('.advanced-options');


const renderTasks = (obj, tasksList, doneList, form, projectsList,
  editForm = null, editNum = null) => {
  while (tasksList.firstChild) {
    tasksList.removeChild(tasksList.firstChild);
  }
  while (doneList.firstChild) {
    doneList.removeChild(doneList.firstChild);
  }
  form.style.display = 'block';

  if (projectsList === undefined || projectsList.length === 0) {
    form.style.display = 'none';
    return;
  }

  for (let i = 0; i < obj.list.length; i += 1) {
    const taskContainer = document.createElement('div');

    taskContainer.classList.add('task-container');
    const mainInfoContainer = document.createElement('div');
    const additionalInfoContainer = document.createElement('div');
    const title = document.createElement('h3');
    const detailsContainer = document.createElement('div');
    const desc = document.createElement('p');
    const date = document.createElement('p');
    const tooltipp = document.createElement('span');
    const priority = document.createElement('p');
    const showBtn = addShowDetailsBtn(detailsContainer);
    const deleteTaskBtn = addDeleteTaskBtn(obj, i, renderTasks);
    const checkbox = addCheckbox(obj, i, renderTasks);
    const editBtn = addEditTaskBtn(obj, i, renderTasks);

    const addContent = () => {
      title.textContent = obj.list[i].title;
      desc.textContent = obj.list[i].desc;
      date.textContent = obj.list[i].dueDate;
      tooltipp.textContent = formatDate(obj.list[i].dueDate);
      date.classList.add('tooltipp');
      tooltipp.classList.add('tooltipptext');
      priority.textContent = obj.list[i].priority;
      priority.classList.add(stylesToPriority(priority), 'p-1', 'rounded');
      mainInfoContainer.classList.add('main-info');
      additionalInfoContainer.classList.add('additional-info');
      checkbox.classList.add('mr-2');
    };
    addContent();

    const appendElements = () => {
      detailsContainer.style.display = 'none';
      detailsContainer.classList.add('details-container', 'mt-2');

      date.appendChild(tooltipp);
      mainInfoContainer.append(checkbox, title);
      additionalInfoContainer.append(
        priority,
        date,
        deleteTaskBtn,
        editBtn,
        showBtn,
      );
      taskContainer.append(mainInfoContainer, additionalInfoContainer);

      if (i === editNum) {
        taskContainer.appendChild(editForm);
      }

      detailsContainer.appendChild(desc);
      taskContainer.appendChild(detailsContainer);
      appendDone(obj, i, taskContainer, doneList, tasksList);
    };
    appendElements();
  }
};

const renderAllTasks = (obj, tasksList, doneList, form, projectsList,
  editForm = null, editNum = null, editNumAddit = null) => {
  while (tasksList.firstChild) {
    tasksList.removeChild(tasksList.firstChild);
  }
  while (doneList.firstChild) {
    doneList.removeChild(doneList.firstChild);
  }

  form.style.display = 'none';
  for (let j = 0; j < projectsList.length; j += 1) {
    for (let i = 0; i < projectsList[j].list.length; i += 1) {
      const taskContainer = document.createElement('div');
      taskContainer.classList.add('task-container');
      const mainInfoContainer = document.createElement('div');
      const additionalInfoContainer = document.createElement('div');
      const title = document.createElement('h3');
      const detailsContainer = document.createElement('div');
      const desc = document.createElement('p');
      const date = document.createElement('p');
      const tooltipp = document.createElement('span');
      const priority = document.createElement('p');
      const showBtn = addShowDetailsBtn(detailsContainer);
      const deleteTaskBtn = addDeleteTaskBtn(projectsList[j], i, renderAllTasks);
      const checkbox = addCheckbox(projectsList[j], i, renderAllTasks);
      const editBtn = addEditTaskBtn(projectsList[j], i, renderAllTasks, j);

      const addContent = () => {
        title.textContent = projectsList[j].list[i].title;
        desc.textContent = projectsList[j].list[i].desc;
        date.textContent = projectsList[j].list[i].dueDate;
        tooltipp.textContent = formatDate(projectsList[j].list[i].dueDate);
        date.classList.add('tooltipp');
        tooltipp.classList.add('tooltipptext');
        priority.textContent = projectsList[j].list[i].priority;
        priority.classList.add(stylesToPriority(priority), 'p-1', 'rounded');
        mainInfoContainer.classList.add('main-info');
        additionalInfoContainer.classList.add('additional-info');
        checkbox.classList.add('mr-2');
      };
      addContent();

      const appendElements = () => {
        detailsContainer.style.display = 'none';
        detailsContainer.classList.add('details-container', 'mt-2');

        date.appendChild(tooltipp);
        mainInfoContainer.append(checkbox, title);
        additionalInfoContainer.append(
          priority,
          date,
          deleteTaskBtn,
          editBtn,
          showBtn,
        );
        taskContainer.append(mainInfoContainer, additionalInfoContainer);

        if (i === editNum && j === editNumAddit) {
          taskContainer.appendChild(editForm);
        }

        detailsContainer.appendChild(desc);
        taskContainer.appendChild(detailsContainer);
        appendDone(projectsList[j], i, taskContainer, doneList, tasksList);
      };
      appendElements();
    }
  }
};

const allTasksList = (projectsListContainer, projectsList) => {
  const cont = document.createElement('div');
  const title = document.createElement('h3');

  cont.classList.add('list-cont');
  title.textContent = 'All tasks';

  cont.appendChild(title);
  projectsListContainer.appendChild(cont);

  title.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.active').classList.remove('active');
    cont.classList.add('active');
    if (projectsList[0]) { renderAllTasks(projectsList[0], tasksList, doneList, form, projectsList); }
  });

  return cont;
};

const renderLists = (projectsList, projectsListContainer, allTasksList) => {
  while (projectsListContainer.firstChild) {
    projectsListContainer.removeChild(projectsListContainer.firstChild);
  }

  if (projectsList === undefined || projectsList.length === 0) {
    return;
  }

  const allTaskHeader = allTasksList(projectsListContainer, projectsList);
  projectsListContainer.appendChild(allTaskHeader);

  for (let i = 0; i < projectsList.length; i += 1) {
    const cont = document.createElement('div');
    const title = document.createElement('h3');
    const deleteListBtn = addDeleteListBtn(projectsList, i, renderLists, renderTasks);

    const appendElements = () => {
      cont.classList.add('list-cont');
      title.textContent = projectsList[i].title;

      cont.append(title, deleteListBtn);
      projectsListContainer.appendChild(cont);

      if (projectsList[0] && i === 0) {
        cont.classList.add('active');
      }

      title.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.active').classList.remove('active');
        cont.classList.add('active');
        renderTasks(projectsList[i], tasksList, doneList, form, projectsList);
      });
    };
    appendElements();
  }
};

const defaultTasks = (projectsList) => {
  const dtask1 = task('The Winds of Winter', 'Book 1', '2022-12-11', 'H', true);
  const dtask2 = task('A Dream of Spring', 'Book 2', '2021-12-03', 'H');
  const dtask3 = task('A Clash of Kings', 'Book 3', '2023-12-12', 'M');
  const dtask4 = task('A Game of Thrones', 'Book 2', '2021-11-06', 'L');
  const dTodoList1 = toDoList('A Song of Ice and Fire');
  const dTodoList2 = toDoList('The Lord of the Rings');
  const dtask5 = task('The Two Towers', 'desc1', '2022-12-04', 'M');
  const dtask6 = task('Fellowship of the Ring', 'desc1', '2021-12-10', 'M');

  dTodoList1.list.push(dtask1, dtask2, dtask3, dtask4);
  dTodoList2.list.push(dtask5, dtask6);

  projectsList.push(dTodoList1);
  projectsList.push(dTodoList2);
};

document.addEventListener('DOMContentLoaded', () => {
  submit.addEventListener('click', (e) => {
    e.preventDefault();
    const active = document.querySelector('.active').firstChild.innerText;
    const currentProject = projectsList.filter((obj) => obj.title === active)[0];
    addNewTask(currentProject, newTaskValidation, form);
    saveLocalStorage();
    renderTasks(currentProject, tasksList, doneList, form, projectsList);
  });

  sidebarSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    if (newListValidation(modal, newListInput.value, openModal)) {
      addNewList(projectsList, sidebarForm);
      saveLocalStorage();
      renderLists(projectsList, projectsListContainer, allTasksList);
      renderTasks(projectsList[0], tasksList, doneList, form, projectsList);
    }
  });


  if (localStorage.getItem('projectsList') === null) {
    defaultTasks(projectsList);
  }

  advButtonEvent(advButton, advOptions);
  addLogo(sidebar);
  addIcon();
  renderLists(projectsList, projectsListContainer, allTasksList);
  renderAllTasks();
  document.querySelector('.active').classList.remove('active');
  document.getElementsByClassName('list-cont')[0].classList.add('active');
});


export {
  renderTasks,
  renderAllTasks,
  allTasksList,
  renderLists,
  form,
  submit,
  tasksList,
  doneList,
  sidebarForm,
  sidebarSubmit,
  projectsListContainer,
  sidebar,
  advButton,
  advOptions,
};
