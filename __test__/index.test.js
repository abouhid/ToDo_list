
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
  });
});

describe('renderAllTasks function', () => {
  test('should save list of projects in localStorage', () => {


  });
});

describe('allTasksList function', () => {
  test('should save list of projects in localStorage', () => {


  });
});

describe('renderLists function', () => {
  test('should save list of projects in localStorage', () => {


  });
});

describe('defaultTasks function', () => {
  test('should save list of projects in localStorage', () => {


  });
});