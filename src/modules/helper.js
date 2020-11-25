import differenceInDays from 'date-fns/differenceInDays';
import logo from '../images/logo1.png';

const modal = document.querySelector('.modal');
// const advButton = document.querySelector('.advButton');
// const advOptions = document.querySelector('.advanced-options');
// const exitModal = document.querySelector('.exit-modal');
// const modalContent = document.querySelector('.modal-content');
// const modalMessage = document.createElement('p');
const sidebar = document.querySelector('.sidebar');

const addLogo = (sidebar) => {
  const logoImg = new Image();
  logoImg.src = logo;
  sidebar.prepend(logoImg);
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
  const modalMessage = document.createElement('p');

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

const newTaskValidation = (modal, title, openModal) => {
  if (title === '') {
    openModal(modal, 'Task title must exist!');
    return false;
  }
  return true;
};

const newListValidation = (modal, title, openModal) => {
  if (title === '') {
    openModal(modal, 'List title must exist!');
    return false;
  }
  return true;
};

document.addEventListener('keydown', (e) => {
  const { keyCode } = e;
  if (keyCode === 27) {
    modal.style.display = 'none';
  }
});

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

const advButtonEvent = (advButton, advOptions) => {
  advButton.addEventListener('click', () => {
    if (advOptions.style.display === 'block') {
      advOptions.style.display = 'none';
      advButton.innerText = 'Advanced Options';
    } else {
      advOptions.style.display = 'block';
      advButton.textContent = 'Hide Options';
    }
  });
};

const addIcon = () => {
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.rel = 'shortcut icon';
  link.href = logo;
  document.getElementsByTagName('head')[0].appendChild(link);
};


export {
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
};
