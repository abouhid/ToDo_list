import { defaultTasks } from './modules/helper';
import { renderLists } from './modules/toDoList';
import { renderTasks } from './modules/task';

const projectsList = [];

defaultTasks();
renderLists(projectsList);
renderTasks(projectsList[0]);

export { projectsList };