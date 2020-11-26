import {
  stylesToPriority,
  formatDate,
  openModal,
  appendDone,
  newTaskValidation,
  newListValidation,
  addShowDetailsBtn,
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
    expect(sidebar.innerHTML).toEqual('<img src="test-file-stub">');
  });
});

describe('AddIcon function', () => {
  test('should add favicon to the project', () => {
    addIcon();
    expect(document.getElementsByTagName('head')[0].innerHTML).toEqual('<link rel="shortcut icon" href="test-file-stub">');
  });
});

describe('stylesToPriority function', () => {
  test("should return 'high' if text content is 'H'", () => {
    expect(stylesToPriority({ textContent: 'H' })).toEqual('high');
  });

  test("should return 'medium' if text content is 'M'", () => {
    expect(stylesToPriority({ textContent: 'M' })).toEqual('medium');
  });
});

describe('formatDate function', () => {
  test("should formate date in 'X day(s) left' format", () => {
    expect(formatDate(new Date())).toEqual('0 day(s) left');
  });
});

describe('appendDone function', () => {
  test('should append done/open tasks to its correct container', () => {
    const obj = { list: [{ status: true }] };

    document.body.innerHTML = `<div class="task-list">
        </div><div class="done-list">
        </div>`;
    const taskContainer = document.createElement('div');
    taskContainer.textContent = 'New Task';
    const doneList = document.querySelector('.done-list');
    const taskList = document.querySelector('.task-list');

    appendDone(obj, 0, taskContainer, doneList, taskList);
    expect(doneList.innerHTML).toMatch(/New Task/);
  });
});

describe('openModal function', () => {
  test('should open modal with provided content', () => {
    document.body.innerHTML = `
      <div class="modal">
        <div class="modal-content">
          <div class="button btn btn-secondary exit-modal">Exit</div>
        </div>
      </div>`;
    const modal = document.querySelector('.modal');
    openModal(modal, 'Something went wrong...');
    const modalMessageAppended = document.querySelector('p').innerHTML;

    expect(modal.style.display).toEqual('block');
    expect(modalMessageAppended).toEqual('Something went wrong...');
  });
});

describe('newTaskValidation function', () => {
  const modal = document.querySelector('.modal');
  const myMock = jest.fn();
  document.body.innerHTML = '<div class="modal"></div>';
  test('should check if the task input is empty', () => {
    expect(newTaskValidation(modal, '', myMock)).toBe(false);
  });
  test('should check if the task input is filled', () => {
    expect(newTaskValidation(modal, 'test', myMock)).toBe(true);
  });
});


describe('newListValidation function', () => {
  document.body.innerHTML = '<span class="modal"></span>';
  const myMock = jest.fn();
  const modal = document.querySelector('.modal');
  test('should check if the List input is empty', () => {
    expect(newListValidation(modal, '', myMock)).toBe(false);
  });
  test('should check if the List input is filled', () => {
    expect(newListValidation(modal, 'test', myMock)).toBe(true);
  });
});

describe('addShowDetailsBtn function', () => {
  document.body.innerHTML = '<div class="container"></div>';
  const container = document.querySelector('.container');
  test('should return the chevron button', () => {
    expect(addShowDetailsBtn(container).innerHTML).toEqual('<i class="fas fa-chevron-down"></i>');
  });
});

describe('advButtonEvent function', () => {
  document.body.innerHTML = '<div class="advOptions"></div><div class="advButton"></div>';
  const advOptions = document.querySelector('.advOptions');
  const advButton = document.querySelector('.advButton');
  advOptions.style.display = 'block';
  test('should return the chevron button', () => {
    advButtonEvent(advButton, advOptions);
    advButton.click();
    expect(advOptions.style.display).toEqual('none');
    expect(advButton.innerText).toEqual('Advanced Options');
  });
});
