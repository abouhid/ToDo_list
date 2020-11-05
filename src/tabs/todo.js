const submit = document.getElementById('submit');
const form = document.getElementById('book-form');
const newTask = document.getElementById('task-input').value;
const main = document.querySelector('main')

const ToDoList = (title) => {
    this.title = title;
    this.list = [];

}
const Task = (title) => {
    this.title = title;
}
// title, description, dueDate and priority.

// submit.addEventListener('click', (e) => {
//     e.preventDefault();
//     addBookToLibrary();
// });

export {
    ToDoList,
    Task
}