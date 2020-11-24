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

describe("stylesToPriority function", () => {
  test("should return 'high' if text content is 'H'", () => {
    expect(stylesToPriority({textContent:"H"})).toEqual('high');
  });

  test("should return 'medium' if text content is 'M'", () => {
    expect(stylesToPriority({ textContent: "M" })).toEqual("medium");
  });
});

describe("formatDate function", () => {
  test("should formate date in 'X day(s) left' format", () => {
    expect(formatDate(new Date())).toEqual("0 day(s) left");
  });
});

describe("openModal function", () => {
  testç("should open modal with provided content", () => {
    document.body.innerHTML =`
      <div class="modal">
        <div class="modal-content">
          <div class="button btn btn-secondary exit-modal">Exit</div>
        </div>
      </div>`
    const modal = document.querySelector(".modal");
    const exitModal = document.querySelector(".exit-modal");
    const modalContent = document.querySelector(".modal-content");
    const modalMessage = document.createElement("p");
  
    openModal(modal, "Something went wrong...");
    const modalMessageAppended = document.querySelector('p').innerHTML

    expect(modal.style.display).toEqual("block");
    expect(modalMessageAppended).toEqual('Something went wrong...');
  });
});