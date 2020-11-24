import {
  task, toDoList, addNewTask, addNewList,
} from '../src/modules/factoryFunc';

describe('task function', () => {
  test('should create task object', () => {
    const task1 = task('The Winds of Winter', 'Book 1', '2022-12-11', 'H', true);
    expect(task1).toEqual({
      title: 'The Winds of Winter',
      desc: 'Book 1',
      dueDate: '2022-12-11',
      priority: 'H',
      status: true,
    });
  });
});

describe('toDoList function', () => {
  test('should create To-Do List object', () => {
    const list = toDoList('A Song of Ice and Fire');
    expect(list).toEqual({ title: 'A Song of Ice and Fire', list: [] });
  });
});

const myMock = jest.fn();
myMock.mockReturnValueOnce(true).mockReturnValue();


describe('addNewTask function', () => {
  test('should create a new task', () => {
    const list1 = toDoList('A Song of Ice and Fire');
    document.body.innerHTML = `
    <input id="task-input" value="The Winds of Winter"/>
    <input id="task-desc-input" value="Book 1"/>
    <input id="task-date-input" value="2022-12-11"/>
    <input id="task-priority-input" value="H"/>
  `;
    const form = document.createElement('form');
    addNewTask(list1, myMock, form);
    console.log(list1.list);
    expect(list1.list).toEqual([{
      desc: 'Book 1', dueDate: '2022-12-11', priority: 'H', status: false, title: 'The Winds of Winter',
    }]);
  });
});

describe('addNewList function', () => {
  test.only('should create a new task', () => {
    const projectsList = [];
    document.body.innerHTML = `
    <input id="sidebar-input" value="The Winds of Winter"/>
  `;
    const form = document.createElement('form');
    addNewList(projectsList, form);

    console.log(projectsList);
    expect(projectsList).toEqual([{
      title: 'The Winds of Winter', list: [],
    }]);
  });
});
