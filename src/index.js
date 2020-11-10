import { defaultTasks } from './modules/helper';
import { renderLists } from './modules/toDoList';
import { renderTasks } from './modules/task';

const submit = document.getElementById('submit');
const sidebarSubmit = document.getElementById('sidebar-submit');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const advButton = document.querySelector('.advButton');
const advOptions = document.querySelector('.advanced-options');
const tasksList = document.querySelector('.tasks-list');
const projectsListContainer = document.querySelector('.project-names');
const form = document.getElementById('task-form');
const sidebarForm = document.getElementById('sidebar-form');
const doneList = document.querySelector('.done-list');
const newListInput = document.getElementById('sidebar-input');
const modalMessage = document.createElement('p');
const projectsList = [];

defaultTasks();
renderLists(projectsList);
renderTasks(projectsList[0]);


export { submit, 
  sidebarSubmit, 
  modal, 
  modalContent, 
  advButton, 
  advOptions, 
  tasksList, 
  projectsListContainer,
  form, 
  sidebarForm, 
  doneList, 
  newListInput, 
  modalMessage, 
  projectsList
}