import { modal, openModal } from './helper';

const newListInput = document.getElementById('sidebar-input');

const task = (title, desc, dueDate, priority, status = false) => ({
  title,
  desc,
  dueDate,
  priority,
  status,
});

const toDoList = (title, list = []) => ({ title, list });

const addNewTask = (obj, newTaskValidation, form) => {
  const taskTitleInput = document.querySelector('#task-input').value;
  const taskDescInput = document.getElementById('task-desc-input').value;
  const taskDateInput = document.getElementById('task-date-input').value;
  const taskPriorityInput = document.getElementById('task-priority-input').value;
  if (newTaskValidation(modal, taskTitleInput, openModal)) {
    const newTask = task(
      taskTitleInput,
      taskDescInput,
      taskDateInput,
      taskPriorityInput,
    );
    form.reset();
    obj.list.unshift(newTask);
  }
};

const addNewList = (obj, sidebarForm) => {
  const newListInput = document.getElementById('sidebar-input');
  const newList = toDoList(newListInput.value);
  sidebarForm.reset();
  obj.unshift(newList);
};

export {
  task, toDoList, addNewTask, addNewList, newListInput,
};