import {
  toDoList,
  task
} from './tabs/todo'

const submit = document.getElementById('submit');
const sidebar_submit = document.getElementById('sidebar-submit');
const main = document.querySelector('main')
const sidebar = document.querySelector('.sidebar')
const advButton = document.querySelector('.advButton')
const advOptions = document.querySelector('.advanced-options')
const tasksList = document.querySelector('.tasks-list')
const projectsListContainer = document.querySelector('.project-names')
const form = document.getElementById("task-form");
const sidebarForm = document.getElementById("sidebar-form");
const projectsList = []
const doneList = document.querySelector('.done-list');

const defaultTasks = () => {
  const dtask1 = task('The Winds of Winter', 'desc1', '2020-12-12', 'high', true);
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

const renderTasks = (obj,editForm=null,editNum=null) => {
  while (tasksList.firstChild) {
    tasksList.removeChild(tasksList.firstChild);
  }
  while (doneList.firstChild) {
    doneList.removeChild(doneList.firstChild);
  }
  for (let i = 0; i < obj.list.length; i += 1) {
    const taskContainer = document.createElement('div');
    const title = document.createElement('h3');
    const detailsContainer = document.createElement("div");
    const desc = document.createElement("p");
    const date = document.createElement("p");
    const priority = document.createElement("p");
    const showBtn = addShowDetailsBtn(detailsContainer);
    const deleteTaskBtn = addDeleteTaskBtn(obj, i);
    const checkbox = addCheckbox(obj, i);
    const editBtn = addEditTaskBtn(obj, i, taskContainer);

    const addContent= (() => {
      title.textContent = obj.list[i].title;
      desc.textContent = obj.list[i].desc;
      date.textContent = obj.list[i].dueDate;
      priority.textContent = obj.list[i].priority;
    })()

    const appendElements = (() => {

      detailsContainer.style.display = "none";

      taskContainer.appendChild(checkbox);
      taskContainer.appendChild(title);
      taskContainer.appendChild(date);

      taskContainer.appendChild(showBtn);
      taskContainer.appendChild(deleteTaskBtn);
      taskContainer.appendChild(editBtn);
      if (i===editNum) { taskContainer.appendChild(editForm)};  
      
      detailsContainer.appendChild(desc);
      detailsContainer.appendChild(priority);
      taskContainer.appendChild(detailsContainer);
      appendDone(obj,i,taskContainer,doneList,tasksList)
    })()
  }
}

const addEditTaskForm = (obj, i) => {
  const editForm = document.createElement('form');
  const taskTitleInput = document.createElement('input');
  const taskDescInput = document.createElement('input');
  const taskDateInput = document.createElement("input");
  const taskPriorityInput = document.createElement("select");
  const submit = document.createElement("input");

  taskTitleInput.type = "text";
  taskDescInput.type = "text";
  taskDateInput.type = "date";
  submit.type = "submit";

  const priorityOptionHigh = document.createElement("option")
  const priorityOptionMedium = document.createElement("option")
  const priorityOptionLow = document.createElement("option")
  
  priorityOptionHigh.value = "high";
  priorityOptionMedium.value = "medium";
  priorityOptionLow.value = "low";

  priorityOptionHigh.textContent = "High";
  priorityOptionMedium.textContent = "Medium";
  priorityOptionLow.textContent = "Low";

  taskTitleInput.value = obj.list[i].title;
  taskDescInput.value = obj.list[i].desc;
  taskDateInput.value = obj.list[i].dueDate;
  taskPriorityInput.value = obj.list[i].priority;

  taskPriorityInput.appendChild(priorityOptionHigh);
  taskPriorityInput.appendChild(priorityOptionMedium);
  taskPriorityInput.appendChild(priorityOptionLow);

  editForm.appendChild(taskTitleInput);
  editForm.appendChild(taskDescInput);
  editForm.appendChild(taskDateInput);
  editForm.appendChild(taskPriorityInput);
  editForm.appendChild(submit);

  submit.addEventListener("click", (e) => {
    e.preventDefault();
    obj.list[i].title = taskTitleInput.value;
    obj.list[i].desc = taskDescInput.value;
    obj.list[i].dueDate = taskDateInput.value;
    obj.list[i].priority = taskPriorityInput.value;
    renderTasks(obj)
  });

  return editForm;
}

const addEditTaskBtn = (obj, i, container) => {
  const editBtn = document.createElement("button");
  
  editBtn.textContent = "Edit";

  editBtn.addEventListener("click", () => {
    const editForm = addEditTaskForm(obj, i);
    const numEdit =i
    // container.appendChild(editForm);
     renderTasks(obj,editForm,i);
  });

  return editBtn;
}

const appendDone =(obj,i,taskContainer,doneList,tasksList) => {
  if (obj.list[i].status){
    doneList.appendChild(taskContainer);
  } else {
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

const addDeleteTaskBtn = (obj, i) => {
  const deleteBtn = document.createElement('button');

  deleteBtn.textContent = 'Delete';

  deleteBtn.addEventListener('click', () => {

    obj.list.splice(i, 1);
    renderTasks(obj);
    // saveLocalStorage();
  });

  return deleteBtn;

}

const addCheckbox = (obj, i) => {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = obj.list[i].status;

  checkbox.addEventListener('change', () => {
    obj.list[i].status = checkbox.checked ? true : false;
    renderTasks(obj)
    // saveLocalStorage();
  });

  return checkbox

}

submit.addEventListener('click', (e) => {
  e.preventDefault();
  let active = document.querySelector('.active').firstChild.innerText;
  let current_project = projectsList.filter(obj => obj.title === active)[0];
  addNewTask(current_project);
  renderTasks(current_project);
});

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

  deleteBtn.textContent = 'x';

  deleteBtn.addEventListener('click', () => {

    projectsList.splice(i, 1);
    renderLists(projectsList);

    renderTasks(projectsList[0])
    // saveLocalStorage();
  });

  return deleteBtn;

}

const addNewList = (obj) => {
  const newListInput = document.getElementById("sidebar-input").value;
  const newList = toDoList(newListInput);
  sidebarForm.reset();
  obj.unshift(newList);
};

sidebar_submit.addEventListener('click', (e) => {
  e.preventDefault();
  addNewList(projectsList);
  renderLists(projectsList);
});

  advButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (advOptions.style.display === "block") advOptions.style.display = "none";
    else advOptions.style.display = "block";
  });


defaultTasks();
renderLists(projectsList);
renderTasks(projectsList[0]);