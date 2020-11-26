<<<<<<< HEAD

import {
    renderTasks,
    renderAllTasks,
    allTasksList,
    renderLists,
    startUp
  } from '../src/index';
  
  const obj = {
      title: "A song of ice and fire",
    list: [{
      desc: 'Book 1', dueDate: '2022-12-11', priority: 'H', status: false, title: 'The Winds of Winter',
    }],
  };
  
  describe('renderTasks function', () => {
      
      document.body.innerHTML = '<div class="advOptions"></div><div class="advButton"></div>';
      const advOptions = document.querySelector('.advOptions');
      const advButton = document.querySelector('.advButton');

      test('should save list of projects in localStorage', () => {

    // renderTasks(obj)
    // expect(renderTasks).toEqual()
=======
import {
  renderTasks,
  renderAllTasks,
  allTasksList,
  renderLists,
} from '../src/index';

document.body.innerHTML = `<div class="modal">
      <div class="modal-content"> 
        <div class="button btn btn-secondary exit-modal">Exit</div>       
      </div>
    </div>
    <div class="d-flex">
      <div class="sidebar">
        <form action="" id="sidebar-form" class="mt-4">
          <input
            class="form-control mb-3"
            type="text"
            id="sidebar-input"
            placeholder="Create a new List"
          />

          <input
            type="submit"
            value="Submit"
            id="sidebar-submit"
            class="btn btn-secondary d-none"
          />
        </form>
        <div class="project-names mt-2"></div>
      </div>
      <div class="nav-panel">
        <main>
          <form action="" id="task-form">
            <div class="adv-input">
            <input
              class="form-control mb-3"
              type="text"
              id="task-input"
              placeholder="Add a task title"
            />
          </div>
          <div class="advanced-options">
            <input
            class="form-control mb-3"
            type="text"
            id="task-desc-input"
            placeholder="Add a task description"
            />
            <div class="date-and-priority">
              <input
              class="form-control mb-3"
              type="date"
              id="task-date-input"
              />
              <select name="priorities" id="task-priority-input" class="custom-select custom-select-sm mb-3">
                <option value="" disabled selected>Choose priority</option>               
                <option value="H">High</option>
                <option value="M">Medium</option>
                <option value="L">Low</option>
              </select>
            </div>
          </div>
            <span class="advButton btn btn-secondary button">Advanced Options</span>
            <input
              type="submit"
              value="Submit"
              id="submit"
              class="btn btn-secondary button"
            />
          </form>
          <div class="tasks-list"></div>
          <div class="done-list"></div>
        </main>
      </div>
    </div>`;
const tasksList = document.createElement('div');
const doneList = document.createElement('div');
const form = document.createElement('form');
const projectsListContainer = document.querySelector('.project-names');
const projectsList = [{
  title: 'Title1',
  list: [
    {
      desc: 'Book 1', dueDate: '2022-12-11', priority: 'H', status: false, title: 'The Winds of Winter',
    },
  ],
},
{
  title: 'Title2',
  list: [
    {
      desc: 'Book 2', dueDate: '2021-12-03', priority: 'H', status: false, title: 'A Dream of Spring',
    },
  ],
}];

describe('renderTasks function', () => {
  test('should render document with tasks', () => {
    renderTasks(projectsList[0], tasksList, doneList, form, projectsList);
    expect(tasksList.firstChild.innerHTML).toMatch(/The Winds of Winter/);
>>>>>>> 5b1b5ecd34062f25662c2b9a95326d574d6edd40
  });
});

describe('renderAllTasks function', () => {
<<<<<<< HEAD
  test('should save list of projects in localStorage', () => {


=======
  test('should render document with all tasks', () => {
    renderAllTasks(projectsList[0], tasksList, doneList, form, projectsList);
    expect(tasksList.lastChild.innerHTML).toMatch(/A Dream of Spring/);
>>>>>>> 5b1b5ecd34062f25662c2b9a95326d574d6edd40
  });
});

describe('allTasksList function', () => {
<<<<<<< HEAD
  test('should save list of projects in localStorage', () => {


=======
  test('should render document with DOM element "All tasks"', () => {
    allTasksList(projectsListContainer, projectsList);
    expect(projectsListContainer.firstChild.innerHTML).toEqual('<h3>All tasks</h3>');
>>>>>>> 5b1b5ecd34062f25662c2b9a95326d574d6edd40
  });
});

describe('renderLists function', () => {
<<<<<<< HEAD
  test('should save list of projects in localStorage', () => {


  });
});

describe('defaultTasks function', () => {
  test('should save list of projects in localStorage', () => {


=======
  test('should render document with all lists', () => {
    const mockFunc = jest.fn();
    const emptyDiv = document.createElement('div');
    emptyDiv.textContent = 'empty div';
    mockFunc.mockReturnValue(emptyDiv);
    renderLists(projectsList, projectsListContainer, mockFunc);
    expect(projectsListContainer.innerHTML).toMatch('Title2');
>>>>>>> 5b1b5ecd34062f25662c2b9a95326d574d6edd40
  });
});