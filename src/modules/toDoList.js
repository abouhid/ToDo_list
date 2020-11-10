import { newListInput, addDeleteListBtn } from './events';
import { renderTasks } from './task';

const projectsListContainer = document.querySelector('.project-names');
const sidebarForm = document.getElementById('sidebar-form');

const toDoList = (title, list = []) => ({ title, list });

const addNewList = (obj) => {
  const newList = toDoList(newListInput.value);
  sidebarForm.reset();
  obj.unshift(newList);
};

const renderLists = (projectsList) => {
  while (projectsListContainer.firstChild) {
    projectsListContainer.removeChild(projectsListContainer.firstChild);
  }

  for (let i = 0; i < projectsList.length; i += 1) {
    const cont = document.createElement('div');
    const title = document.createElement('h3');
    const deleteListBtn = addDeleteListBtn(projectsList, i);

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
        renderTasks(projectsList[i]);
      });
    };
    appendElements();
  }
};

export { toDoList, addNewList, renderLists };