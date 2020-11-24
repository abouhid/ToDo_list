import { task, toDoList, addNewTask, addNewList } from '../src/modules/factoryFunc'

describe("task factory function", () => {
  test("should create task object", () => {
    expect(task('The Winds of Winter', 'Book 1', '2022-12-11', 'H', true)).toBe(adf);
  });
});