'use strict';

const inputText = document.querySelector('.input-text'),
  inputDate = document.querySelector('.input-date'),
  inputTime = document.querySelector('.input-time'),
  addForm = document.querySelector('.add-form'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

const todoItemBackground = ['#05EFCC', '#8FE3C5', '#9949D4', '#3A45CC', '#9B250E', '#ED93DE', '#D6C7BA', '#F79680', '#E4D20C', '#92EE83', '#D07977', '#1BC7FB', '#F37274', '#79D49A'];
let todoData;



const renderList = () => {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData = localStorage.todoData ? JSON.parse(localStorage.todoData) : [];

  todoData.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.style.backgroundColor = item.background;
    li.innerHTML = `
    <span class="item-title">${item.name}</span>
    <span class="item-time">${item.time}</span>
    <button class="btn btn-delete"></button>
    <button class="btn btn-complete"></button>
    `;
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const todoCompletedBtn = li.querySelector('.btn-complete');
    todoCompletedBtn.addEventListener('click', () => {
      item.completed = !item.completed;
      let json = JSON.stringify(todoData);
      localStorage.todoData = json;
      renderList();
    });
    const todoRemovedBtn = li.querySelector('.btn-delete');
    todoRemovedBtn.addEventListener('click', () => {
      if (!confirm('Вы уверены?')) return;
      todoData.splice(todoData.indexOf(item), 1);
      let json = JSON.stringify(todoData);
      localStorage.todoData = json;
      renderList();
    });
  });
};


addForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!inputText.value || !inputDate || !inputTime) {
    alert('Заполни поле ввода');
    return;
  }
  const randColor = Math.floor(Math.random() * todoItemBackground.length);
  const newTodo = {
    name: inputText.value,
    date: inputDate.value,
    time: inputTime.value,
    background: todoItemBackground[randColor],
    completed: false
  };
  todoData.push(newTodo);
  let json = JSON.stringify(todoData);
  localStorage.todoData = json;
  renderList();
  addForm.reset();
});


renderList();