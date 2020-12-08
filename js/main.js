'use strict';

const inputText = document.querySelector('.input-text'),
  inputConst = document.querySelector('.title-const'),
  inputTime = document.querySelector('.input-time'),
  addForm = document.querySelector('.add-form'),
  addConst = document.querySelector('.add-const'),
  todoList = document.querySelector('.todo-list'),
  constList = document.querySelector('.const-list'),
  todoCompleted = document.querySelector('.todo-completed');

let alertAudio = new Audio(),
  notificationAudio = new Audio();
alertAudio.src = '../sound/alert.mp3';
notificationAudio.src = '../sound/notification.mp3';

const todoItemBackground = ['#05EFCC', '#8FE3C5', '#9949D4', '#3A45CC', '#9B250E', '#ED93DE', '#D6C7BA', '#F79680', '#E4D20C', '#92EE83', '#D07977', '#1BC7FB', '#F37274', '#79D49A'];
let todoData, constData;

const renderList = () => {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData = localStorage.todoData ? JSON.parse(localStorage.todoData) : [];

  todoData.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.draggable = true;
    li.style.backgroundColor = item.background;
    li.innerHTML = `
    <span class="item-title">${item.name}</span>
    <button class="btn btn-delete"></button>
    `;
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    const todoCompletedBtn = li;
    todoCompletedBtn.addEventListener('dblclick', () => {
      item.completed = !item.completed;
      let json = JSON.stringify(todoData);
      localStorage.todoData = json;
      renderList();
    });
    const todoRemovedBtn = li.querySelector('.btn-delete');
    todoRemovedBtn.addEventListener('click', () => {
      todoData.splice(todoData.indexOf(item), 1);
      let json = JSON.stringify(todoData);
      localStorage.todoData = json;
      renderList();
    });
  });
};
const renderConstList = () => {
  constList.textContent = '';
  constData = localStorage.constData ? JSON.parse(localStorage.constData) : [];
  constData.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('const-item');
    li.draggable = true;
    li.style.backgroundColor = item.background;
    li.innerHTML = `
    <span class="item-title">${item.name}</span>
    <button class="btn btn-delete"></button>
    `;

    constList.append(li);
    const constRemovedBtn = li.querySelector('.btn-delete');
    constRemovedBtn.addEventListener('click', () => {
      constData.splice(constData.indexOf(item), 1);
      let json = JSON.stringify(constData);
      localStorage.constData = json;
      renderConstList();
    });
  });
};

addForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!inputText.value) {
    alertAudio.play();
    inputText.style.borderBottom = '2px solid red';
    return;
  }
  inputText.style.borderBottom = '1px solid rgb(136, 136, 136)';
  let randColor = Math.floor(Math.random() * todoItemBackground.length);
  const newTodo = {
    name: inputText.value,
    background: todoItemBackground[randColor],
    completed: false
  };
  todoData.push(newTodo);
  let json = JSON.stringify(todoData);
  localStorage.todoData = json;
  renderList();
  addForm.reset();
});

addConst.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!inputConst.value) {
    alertAudio.play();
    inputConst.style.borderBottom = '2px solid red';
    return;
  }
  inputConst.style.borderBottom = '1px solid rgb(136, 136, 136)';
  let randColor = Math.floor(Math.random() * todoItemBackground.length);
  const newTodo = {
    name: inputConst.value,
    background: todoItemBackground[randColor],
    completed: false
  };
  constData.push(newTodo);
  let json = JSON.stringify(constData);
  localStorage.constData = json;
  renderConstList();
  addConst.reset();
});


renderList();
renderConstList();