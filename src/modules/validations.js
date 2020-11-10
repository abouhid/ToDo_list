import { openModal } from './helper'

const newTaskValidation = (modal, title) => {
  if (title === '') {
    openModal(modal, 'Task title must exist!');
    return false;
  }
  return true;
};

const newListValidation = (modal, title) => {
  if (title === '') {
    openModal(modal, 'List title must exist!');
    return false;
  }
  return true;
};

export { newTaskValidation, newListValidation }
