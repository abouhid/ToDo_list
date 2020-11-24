import { task, toDoList, addNewTask, addNewList } from '../src/modules/factoryFunc'

describe("task function", () => {
  test("should create task object", () => {
    const task1 = task('The Winds of Winter', 'Book 1', '2022-12-11', 'H', true);
    expect(task1).toEqual({
      title: "The Winds of Winter",
      desc: "Book 1",
      dueDate: "2022-12-11",
      priority: "H",
      status: true,
    });
  });
});

describe("toDoList function", () => {
  test("should create To-Do List object", () => {
    const list = toDoList("A Song of Ice and Fire");
    console.log(list);
    expect(list).toEqual({ title: "A Song of Ice and Fire", list: [] });
  });
});

describe("toDoList function", () => {
  test("should create To-Do List object", () => {
    const list = toDoList("A Song of Ice and Fire");
    console.log(list);
    expect(list).toEqual({ title: "A Song of Ice and Fire", list: [] });
  });
});
