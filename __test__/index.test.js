import {
  renderTasks,
  renderAllTasks,
  allTasksList,
  renderLists,
} from '../src/index';

document.body.innerHTML = '<div class="project-names mt-2"></div>';
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
  });
});

describe('renderAllTasks function', () => {
  test('should render document with all tasks', () => {
    renderAllTasks(projectsList[0], tasksList, doneList, form, projectsList);
    expect(tasksList.lastChild.innerHTML).toMatch(/A Dream of Spring/);
  });
});

describe('allTasksList function', () => {
  test('should render document with DOM element "All tasks"', () => {
    allTasksList(projectsListContainer, projectsList);
    expect(projectsListContainer.firstChild.innerHTML).toEqual('<h3>All tasks</h3>');
  });
});

describe('renderLists function', () => {
  test('should render document with all lists', () => {
    const mockFunc = jest.fn();
    const emptyDiv = document.createElement('div');
    emptyDiv.textContent = 'empty div';
    mockFunc.mockReturnValue(emptyDiv);
    renderLists(projectsList, projectsListContainer, mockFunc);
    expect(projectsListContainer.innerHTML).toMatch('Title2');
  });
});