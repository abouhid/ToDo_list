import {
  stylesToPriority,
  formatDate,
  openModal,
  appendDone,
  newTaskValidation,
  newListValidation,
  addShowDetailsBtn,
  modal,
  addIcon,
  addLogo,
  advButtonEvent,
} from '../src/modules/helper';


describe('Add logo function', () => {
  test('should add logo to the project', () => {
    document.body.innerHTML = `
    <div class="sidebar"></div>`;
    const sidebar = document.querySelector('.sidebar');
    addLogo(sidebar);    
    expect(sidebar.innerHTML).toEqual("<img src=\"test-file-stub\">");
  });
});