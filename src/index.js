import {
  toDoList,
  task
} from './tabs/todo'
import { format, compareAsc } from 'date-fns'
import differenceInDays from "date-fns/differenceInDays";
import parseISO from "date-fns/parseISO";


const submit = document.getElementById('submit');
const sidebar_submit = document.getElementById('sidebar-submit');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const advButton = document.querySelector('.advButton')
const advOptions = document.querySelector('.advanced-options')
const tasksList = document.querySelector('.tasks-list')
const projectsListContainer = document.querySelector('.project-names')
const form = document.getElementById("task-form");
const sidebarForm = document.getElementById("sidebar-form");
const projectsList = []
const doneList = document.querySelector('.done-list');
const newListInput = document.getElementById("sidebar-input");
const modalMessage = document.createElement('p')

const defaultTasks = () => {
  const dtask1 = task('The Winds of Winter', 'Book 1', '2022-12-11', 'H', true);
  const dtask2 = task('A Dream of Spring', 'Book 2', '2021-12-03', 'H');
  const dtask3 = task('A Clash of Kings', 'Book 3', '2023-12-12', 'M');
  const dtask4 = task('A Game of Thrones', 'Book 2', '2021-11-06', 'L');
  const dTodoList1 = toDoList('A Song of Ice and Fire');
  const dTodoList2 = toDoList('The Lord of the Rings');
  const dtask5 = task('The Two Towers', 'desc1', '2022-12-04', 'M');
  const dtask6 = task('Fellowship of the Ring', 'desc1', '2021-12-10', 'M');


  dTodoList1.list.push(dtask1, dtask2, dtask3, dtask4);
  dTodoList2.list.push(dtask5,dtask6);

  projectsList.push(dTodoList1);
  projectsList.push(dTodoList2);
};

const renderTasks = (obj, editForm = null, editNum = null) => {
  while (tasksList.firstChild) {
    tasksList.removeChild(tasksList.firstChild);
  }
  while (doneList.firstChild) {
    doneList.removeChild(doneList.firstChild);
  }
  for (let i = 0; i < obj.list.length; i += 1) {
    const taskContainer = document.createElement('div');
    taskContainer.classList.add('task-container')
    const mainInfoContainer = document.createElement('div')
    const additionalInfoContainer = document.createElement('div');
    const title = document.createElement('h3');
    const detailsContainer = document.createElement("div");
    const desc = document.createElement("p");
    const date = document.createElement("p");
    const tooltipp= document.createElement("span"); 
    const priority = document.createElement("p");
    const showBtn = addShowDetailsBtn(detailsContainer);
    const deleteTaskBtn = addDeleteTaskBtn(obj, i);
    const checkbox = addCheckbox(obj, i);
    const editBtn = addEditTaskBtn(obj, i, taskContainer);

    const addContent = (() => {
      title.textContent = obj.list[i].title;
      desc.textContent = obj.list[i].desc;
      date.textContent = obj.list[i].dueDate;
      tooltipp.textContent = formatDate(obj.list[i].dueDate);
      date.classList.add("tooltipp");
      tooltipp.classList.add("tooltipptext");
      priority.textContent = obj.list[i].priority;
      priority.classList.add(stylesToPriority(priority), 'p-1', 'rounded');
      mainInfoContainer.classList.add('main-info');
      additionalInfoContainer.classList.add('additional-info');
      checkbox.classList.add('mr-2');
    })()

    const appendElements = (() => {

      detailsContainer.style.display = "none";
      detailsContainer.classList.add('details-container', 'mt-3');

      date.appendChild(tooltipp);
      mainInfoContainer.appendChild(checkbox);
      mainInfoContainer.appendChild(title);
      additionalInfoContainer.appendChild(priority);
      additionalInfoContainer.appendChild(date);
      additionalInfoContainer.appendChild(deleteTaskBtn);
      additionalInfoContainer.appendChild(editBtn);
      additionalInfoContainer.appendChild(showBtn);

      taskContainer.appendChild(mainInfoContainer);
      taskContainer.appendChild(additionalInfoContainer);

      if (i === editNum) {
        taskContainer.appendChild(editForm)
      };

      detailsContainer.appendChild(desc);
      taskContainer.appendChild(detailsContainer);
      appendDone(obj, i, taskContainer, doneList, tasksList)
    })()
  }
}

const stylesToPriority = (obj) => {
  if (obj.textContent === "H") {
    return "high"
  } else if (obj.textContent === "M") {
    return "medium";
  } else {
    return "low";
  }
}

const formatDate = (date) => {
  const difference = differenceInDays(new Date(date), new Date());
  return `${difference} day(s) left`;
}

const addNewTask = (obj) => {
  const taskTitleInput = document.querySelector("#task-input").value;
  const taskDescInput = document.getElementById("task-desc-input").value;
  const taskDateInput = document.getElementById("task-date-input").value;
  const taskPriorityInput = document.getElementById("task-priority-input").value;
  if (newTaskValidation(modal, taskTitleInput)) {
    const newTask = task(taskTitleInput, taskDescInput, taskDateInput, taskPriorityInput);
    form.reset();
    obj.list.unshift(newTask);
  }
};

const openModal = (modal, content) => {
  const exitModal = document.querySelector('.exit-modal')
  modal.style.display = "block";
  modalMessage.textContent = content;
  modalContent.appendChild(modalMessage);
  modalContent.appendChild(exitModal)

  exitModal.addEventListener('click', () => {
    modal.style.display = "none";
  });
}

submit.addEventListener('click', (e) => {
  e.preventDefault();
  let active = document.querySelector('.active').firstChild.innerText;
  let current_project = projectsList.filter(obj => obj.title === active)[0];
  addNewTask(current_project);
  renderTasks(current_project);
});

const newTaskValidation = (modal, title) => {
  if (title === "") {
    openModal(modal, 'Task title must exist!');
    return false;
  } else {
    return true;
  }
}
const newListValidation = (modal, title) => {
  if (title === "") {
    openModal(modal, 'List title must exist!');
    return false;
  } else {
    return true;
  }
}

document.addEventListener('keydown', function (e) {
  let keyCode = e.keyCode;
  if (keyCode === 27) {
    modal.style.display = "none";
  }
});

const addEditTaskForm = (obj, i) => {
  const editForm = document.createElement('form');
  const taskTitleInput = document.createElement('input');
  const taskDescInput = document.createElement('input');
  const extraInputs = document.createElement('div')
  const taskDateInput = document.createElement("input");
  const taskPriorityInput = document.createElement("select");
  const cancel = document.createElement("input");
  const submit = document.createElement("input");

  taskTitleInput.classList.add('form-control', 'mb-2');
  taskDescInput.classList.add('form-control', 'mb-2');
  taskDateInput.classList.add('form-control', 'mr-2');
  taskPriorityInput.classList.add('custom-select', 'custom-select-sm');
  cancel.classList.add('btn', 'btn-secondary', 'button', 'ml-md-3')
  submit.classList.add('btn', 'btn-secondary', 'button', 'ml-md-3')
  
  extraInputs.classList.add('extra-inputs')

  taskTitleInput.type = "text";
  taskDescInput.type = "text";
  taskDateInput.type = "date";
  cancel.type = "submit";
  submit.type = "submit";

  const priorityOptionHigh = document.createElement("option")
  const priorityOptionMedium = document.createElement("option")
  const priorityOptionLow = document.createElement("option")

  priorityOptionHigh.value = "H";
  priorityOptionMedium.value = "M";
  priorityOptionLow.value = "L";

  priorityOptionHigh.textContent = "High";
  priorityOptionMedium.textContent = "Medium";
  priorityOptionLow.textContent = "Low";
  cancel.value = "Cancel"

  taskTitleInput.value = obj.list[i].title;
  taskDescInput.value = obj.list[i].desc;
  taskDateInput.value = obj.list[i].dueDate;
  taskPriorityInput.value = obj.list[i].priority;

  taskPriorityInput.appendChild(priorityOptionHigh);
  taskPriorityInput.appendChild(priorityOptionMedium);
  taskPriorityInput.appendChild(priorityOptionLow);

  editForm.appendChild(taskTitleInput);
  editForm.appendChild(taskDescInput);
  extraInputs.appendChild(taskDateInput);
  extraInputs.appendChild(taskPriorityInput);
  extraInputs.appendChild(cancel);
  extraInputs.appendChild(submit);
  editForm.appendChild(extraInputs);

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    if (newTaskValidation(modal, taskTitleInput.value, taskDescInput.value, taskDateInput.value, taskPriorityInput.value)) {
      obj.list[i].title = taskTitleInput.value;
      obj.list[i].desc = taskDescInput.value;
      obj.list[i].dueDate = taskDateInput.value;
      obj.list[i].priority = taskPriorityInput.value;
      renderTasks(obj)
    }
  });

  return editForm;
}
const addEditTaskBtn = (obj, i) => {
  const editBtn = document.createElement("span");

  editBtn.innerHTML = "<i class='fas fa-edit'></i>";

  editBtn.addEventListener("click", () => {
    const editForm = addEditTaskForm(obj, i);
    renderTasks(obj, editForm, i);
  });

  return editBtn;
}

const appendDone = (obj, i, taskContainer, doneList, tasksList) => {
  if (obj.list[i].status) {
    doneList.appendChild(taskContainer);
  } else {
    tasksList.appendChild(taskContainer);
  }

}

const addShowDetailsBtn = (container) => {
  const chevron = document.createElement('span');
  chevron.innerHTML = '<i class="fas fa-chevron-down"></i>';

  chevron.addEventListener("click", (e) => {
    e.preventDefault();
    if (container.style.display === "block") container.style.display = "none";
    else container.style.display = "block";
  });

  return chevron;
}

const addDeleteTaskBtn = (obj, i) => {
  const deleteBtn = document.createElement('span');

  deleteBtn.innerHTML = "<i class='fas fa-trash-alt'></i>";

  deleteBtn.addEventListener('click', () => {
    obj.list.splice(i, 1);
    renderTasks(obj);
    // saveLocalStorage();
  });

  return deleteBtn;

}

const addCheckbox = (obj, i) => {
  const checkbox = document.createElement('input');
  checkbox.classList.add('check-task')
  checkbox.type = 'checkbox';
  checkbox.checked = obj.list[i].status;

  checkbox.addEventListener('change', () => {
    obj.list[i].status = checkbox.checked ? true : false;
    renderTasks(obj)
    // saveLocalStorage();
  });

  return checkbox

}

const renderLists = (projectsList) => {
  while (projectsListContainer.firstChild) {
    projectsListContainer.removeChild(projectsListContainer.firstChild);
  }

  for (let i = 0; i < projectsList.length; i += 1) {

    const cont = document.createElement('div')
    const title = document.createElement('h3');
    const deleteListBtn = addDeleteListBtn(projectsList, i);

    const appendElements = (() => {
      cont.classList.add('list-cont')
      title.textContent = projectsList[i].title;
      cont.appendChild(title);
      cont.appendChild(deleteListBtn);
      projectsListContainer.appendChild(cont);

      if (projectsList[0] && i === 0) {
        cont.classList.add('active')
      };

      title.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.active').classList.remove('active');
        cont.classList.add('active')
        renderTasks(projectsList[i]);
      });
    })();
  }
}

const addDeleteListBtn = (projectsList, i) => {
  const deleteBtn = document.createElement('span');

  deleteBtn.innerHTML = "<i class='fas fa-trash-alt'></i>";

  deleteBtn.addEventListener('click', () => {

    projectsList.splice(i, 1);
    renderLists(projectsList);

    renderTasks(projectsList[0])
    // saveLocalStorage();
  });

  return deleteBtn;

}

const addNewList = (obj) => {
  const newList = toDoList(newListInput.value);
  sidebarForm.reset();
  obj.unshift(newList);
};

sidebar_submit.addEventListener('click', (e) => {
  e.preventDefault();
  if(newListValidation(modal,newListInput.value)){
    addNewList(projectsList);
  renderLists(projectsList);
  renderTasks(projectsList[0]);
  }
  
});

advButton.addEventListener('click', (e) => {
  // e.preventDefault();
  if (advOptions.style.display === "block") {
    advOptions.style.display = "none";
    advButton.innerText = "Advanced Options";
  } else {
    advOptions.style.display = "block";
    advButton.textContent = "Hide Options";
  }
});


defaultTasks();
renderLists(projectsList);
renderTasks(projectsList[0]);