import { projectsList } from '../index';
import { modal } from './helper';
import { newListValidation, newTaskValidation } from './validations';
import { addNewList, renderLists } from './toDoList';
import { renderTasks, addNewTask } from './task';


const submit = document.getElementById('submit');
const sidebarSubmit = document.getElementById('sidebar-submit');
const advButton = document.querySelector('.advButton');
const advOptions = document.querySelector('.advanced-options');
const newListInput = document.getElementById('sidebar-input');


submit.addEventListener('click', (e) => {
  e.preventDefault();
  const active = document.querySelector('.active').firstChild.innerText;
  const currentProject = projectsList.filter(obj => obj.title === active)[0];
  addNewTask(currentProject);
  renderTasks(currentProject);
});

document.addEventListener('keydown', (e) => {
  const { keyCode } = e;
  if (keyCode === 27) {
    modal.style.display = 'none';
  }
});

sidebarSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  if (newListValidation(modal, newListInput.value)) {
    addNewList(projectsList);
    renderLists(projectsList);
    renderTasks(projectsList[0]);
  }
});

advButton.addEventListener('click', () => {
  // e.preventDefault();
  if (advOptions.style.display === 'block') {
    advOptions.style.display = 'none';
    advButton.innerText = 'Advanced Options';
  } else {
    advOptions.style.display = 'block';
    advButton.textContent = 'Hide Options';
  }
});

const addEditTaskForm = (obj, i) => {
  const editForm = document.createElement('form');
  const taskTitleInput = document.createElement('input');
  const taskDescInput = document.createElement('input');
  const extraInputs = document.createElement('div');
  const taskDateInput = document.createElement('input');
  const taskPriorityInput = document.createElement('select');
  const cancel = document.createElement('input');
  const submit = document.createElement('input');

  taskTitleInput.classList.add('form-control', 'mb-2');
  taskDescInput.classList.add('form-control', 'mb-2');
  taskDateInput.classList.add('form-control', 'mr-md-2', 'mb-2', 'mb-md-0');
  taskPriorityInput.classList.add('custom-select', 'custom-select-sm', 'mb-2', 'mb-md-0');
  cancel.classList.add('btn', 'btn-secondary', 'button', 'ml-md-3');
  submit.classList.add('btn', 'btn-secondary', 'button', 'ml-md-3');

  extraInputs.classList.add('extra-inputs');

  taskTitleInput.type = 'text';
  taskDescInput.type = 'text';
  taskDateInput.type = 'date';
  cancel.type = 'submit';
  submit.type = 'submit';

  const priorityOptionHigh = document.createElement('option');
  const priorityOptionMedium = document.createElement('option');
  const priorityOptionLow = document.createElement('option');

  priorityOptionHigh.value = 'H';
  priorityOptionMedium.value = 'M';
  priorityOptionLow.value = 'L';

  priorityOptionHigh.textContent = 'High';
  priorityOptionMedium.textContent = 'Medium';
  priorityOptionLow.textContent = 'Low';
  cancel.value = 'Cancel';

  taskTitleInput.value = obj.list[i].title;
  taskDescInput.value = obj.list[i].desc;
  taskDateInput.value = obj.list[i].dueDate;
  taskPriorityInput.value = obj.list[i].priority;

  taskPriorityInput.append(priorityOptionHigh, priorityOptionMedium, priorityOptionLow);

  editForm.append(taskTitleInput, taskDescInput);
  extraInputs.append(taskDateInput, taskPriorityInput, cancel, submit);
  editForm.appendChild(extraInputs);

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    if (newTaskValidation(modal,
      taskTitleInput.value,
      taskDescInput.value,
      taskDateInput.value,
      taskPriorityInput.value)) {
      obj.list[i].title = taskTitleInput.value;
      obj.list[i].desc = taskDescInput.value;
      obj.list[i].dueDate = taskDateInput.value;
      obj.list[i].priority = taskPriorityInput.value;
      renderTasks(obj);
    }
  });

  return editForm;
};

const addEditTaskBtn = (obj, i) => {
  const editBtn = document.createElement('span');

  editBtn.innerHTML = "<i class='fas fa-edit'></i>";

  editBtn.addEventListener('click', () => {
    const editForm = addEditTaskForm(obj, i);
    renderTasks(obj, editForm, i);
  });

  return editBtn;
};

const addShowDetailsBtn = (container) => {
  const chevron = document.createElement('span');
  chevron.innerHTML = '<i class="fas fa-chevron-down"></i>';

  chevron.addEventListener('click', (e) => {
    e.preventDefault();
    if (container.style.display === 'block') container.style.display = 'none';
    else container.style.display = 'block';
  });

  return chevron;
};

const addDeleteTaskBtn = (obj, i) => {
  const deleteBtn = document.createElement('span');

  deleteBtn.innerHTML = "<i class='fas fa-trash-alt'></i>";

  deleteBtn.addEventListener('click', () => {
    obj.list.splice(i, 1);
    renderTasks(obj);
    // saveLocalStorage();
  });

  return deleteBtn;
};

const addCheckbox = (obj, i) => {
  const checkbox = document.createElement('input');
  checkbox.classList.add('check-task');
  checkbox.type = 'checkbox';
  checkbox.checked = obj.list[i].status;

  checkbox.addEventListener('change', () => {
    obj.list[i].status = !!checkbox.checked; // why here two (!!)
    renderTasks(obj);
    // saveLocalStorage();
  });

  return checkbox;
};

const addDeleteListBtn = (projectsList, i) => {
  const deleteBtn = document.createElement('span');

  deleteBtn.innerHTML = "<i class='fas fa-trash-alt'></i>";

  deleteBtn.addEventListener('click', () => {
    projectsList.splice(i, 1);
    renderLists(projectsList);

    renderTasks(projectsList[0]);
    // saveLocalStorage();
  });

  return deleteBtn;
};

export {
  addEditTaskForm,
  addEditTaskBtn,
  addShowDetailsBtn,
  addDeleteTaskBtn,
  addCheckbox,
  addDeleteListBtn,
  newListInput,
};