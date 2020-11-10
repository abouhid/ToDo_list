import { projectsList } from '../index'
import differenceInDays from 'date-fns/differenceInDays';

const modal = document.querySelector('.modal');

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
  dTodoList2.list.push(dtask5, dtask6);

  projectsList.push(dTodoList1);
  projectsList.push(dTodoList2);
};

const stylesToPriority = (obj) => {
  if (obj.textContent === 'H') {
    return 'high';
  } if (obj.textContent === 'M') {
    return 'medium';
  }
  return 'low';
};

const formatDate = (date) => {
  const difference = differenceInDays(new Date(date), new Date());
  return `${difference} day(s) left`;
};

const openModal = (modal, content) => {
  const exitModal = document.querySelector('.exit-modal');
  
  const modalContent = document.querySelector('.modal-content');

  modal.style.display = 'block';
  modalMessage.textContent = content;
  modalContent.append(modalMessage, exitModal);

  exitModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });
};

const appendDone = (obj, i, taskContainer, doneList, tasksList) => {
  if (obj.list[i].status) {
    doneList.appendChild(taskContainer);
  } else {
    tasksList.appendChild(taskContainer);
  }
};

export { defaultTasks, stylesToPriority, formatDate, openModal, appendDone, modal }
