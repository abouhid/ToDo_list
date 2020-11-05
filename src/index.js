import { toDoList, task } from './tabs/todo'

const submit = document.getElementById('submit');
const main = document.querySelector('main')
const tasksList = document.querySelector('.tasks-list')

const defaultTasks = () => {
  const dtask1 = task('The Winds of Winter');
  const dtask2 = task('A Dream of Spring');
  const dtask3 = task('A Clash of Kings');
  const dtask4 = task('A Game of Thrones');
  const dTodoList1 = toDoList('A Song of Ice and Fire');
  
  dTodoList1.list.push(dtask1, dtask2, dtask3, dtask4);

  return dTodoList1;
};

const defaultInputs = defaultTasks();
console.log(defaultInputs);

const render = (obj) => {
  while (tasksList.firstChild) {
    tasksList.removeChild(tasksList.firstChild);
  }

  for (let i = 0; i < obj.list.length; i += 1) {
    const taskContainer = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = obj.list[i].title;


    taskContainer.appendChild(title);
    tasksList.appendChild(taskContainer);
  }
}

submit.addEventListener('click', (e) => {
  e.preventDefault();
  defaultInputs.add();
});

render(defaultInputs);
