import { task, toDoList, addNewTask, addNewList } from '../src/modules/factoryFunc'

describe('test factory function', () => {
  test.only('should create task object with its properties', () => {
    expect(task('The Winds of Winter', 'Book 1', '2022-12-11', 'H', true).constructor).toBe(task);
  });
});