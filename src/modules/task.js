const task = (title, desc, dueDate, priority, status = false) => ({
  title, desc, dueDate, priority, status,
});

const addNewTask = (obj) => {
  const taskTitleInput = document.querySelector('#task-input').value;
  const taskDescInput = document.getElementById('task-desc-input').value;
  const taskDateInput = document.getElementById('task-date-input').value;
  const taskPriorityInput = document.getElementById('task-priority-input').value;
  if (newTaskValidation(modal, taskTitleInput)) {
    const newTask = task(taskTitleInput, taskDescInput, taskDateInput, taskPriorityInput);
    form.reset();
    obj.list.unshift(newTask);
  }
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
    const deleteTaskBtn = addDeleteTaskBtn(obj, i);
    const checkbox = addCheckbox(obj, i);
    const editBtn = addEditTaskBtn(obj, i, taskContainer);

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
      additionalInfoContainer.append(priority, date, deleteTaskBtn, editBtn, showBtn);
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

export { task, addNewTask, renderTasks}


