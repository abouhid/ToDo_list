import { newTaskValidation, modal, openModal } from './helper';

const projectsList = JSON.parse(localStorage.getItem('projectsList')) || [];

const saveLocalStorage = () => {
  localStorage.setItem('projectsList', JSON.stringify(projectsList));
};

const addEditTaskForm = (obj, i, renderTasks, newTaskValidation) => {
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
  taskPriorityInput.classList.add(
    'custom-select',
    'custom-select-sm',
    'mb-2',
    'mb-md-0',
  );
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

  taskPriorityInput.append(
    priorityOptionHigh,
    priorityOptionMedium,
    priorityOptionLow,
  );

  editForm.append(taskTitleInput, taskDescInput);
  extraInputs.append(taskDateInput, taskPriorityInput, cancel, submit);
  editForm.appendChild(extraInputs);

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    if (newTaskValidation(modal, taskTitleInput.value, openModal)) {
      obj.list[i].title = taskTitleInput.value;
      obj.list[i].desc = taskDescInput.value;
      obj.list[i].dueDate = taskDateInput.value;
      obj.list[i].priority = taskPriorityInput.value;
      saveLocalStorage();
      renderTasks(obj);
    }
  });

  cancel.addEventListener('click', (e) => {
    e.preventDefault();
    renderTasks(obj);
  });

  return editForm;
};

const addEditTaskBtn = (obj, i, renderTasks, j = null) => {
  const editBtn = document.createElement('span');

  editBtn.innerHTML = "<i class='fas fa-edit'></i>";

  editBtn.addEventListener('click', () => {
    console.log("123");
    const editForm = addEditTaskForm(obj, i, renderTasks, newTaskValidation);
    renderTasks(obj, editForm, i, j);
  });

  return editBtn;
};

const addDeleteTaskBtn = (obj, i, renderTasks) => {
  const deleteBtn = document.createElement('span');

  deleteBtn.innerHTML = "<i class='fas fa-trash-alt'></i>";

  deleteBtn.addEventListener('click', () => {
    obj.list.splice(i, 1);
    renderTasks(obj);
    saveLocalStorage();
  });

  return deleteBtn;
};

const addCheckbox = (obj, i, renderTasks) => {
  const checkbox = document.createElement('input');
  checkbox.classList.add('check-task');
  checkbox.type = 'checkbox';
  checkbox.checked = obj.list[i].status;

  checkbox.addEventListener('change', () => {
    obj.list[i].status = !!checkbox.checked; // why here two (!!)
    renderTasks(obj);
    saveLocalStorage();
  });

  return checkbox;
};

const addDeleteListBtn = (projectsList, i, renderLists, renderTasks) => {
  const deleteBtn = document.createElement('span');

  deleteBtn.innerHTML = "<i class='fas fa-trash-alt'></i>";

  deleteBtn.addEventListener('click', () => {
    projectsList.splice(i, 1);
    saveLocalStorage();
    renderLists(projectsList);
    renderTasks(projectsList[0]);
  });

  return deleteBtn;
};

export {
  addEditTaskForm,
  addEditTaskBtn,
  addDeleteTaskBtn,
  addCheckbox,
  addDeleteListBtn,
  saveLocalStorage,
  projectsList,
};