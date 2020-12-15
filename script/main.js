"use sctrict";
window.addEventListener("DOMContentLoaded", () => {
  const toggleMenu = () => {
    const btnMenu = document.querySelector(".menu-btn"),
      menu = document.querySelector(".menu"),
      btnCloseMenu = document.querySelector(".close-btn"),
      menuItems = menu.querySelectorAll("ul>li");

    const handlerMenu = () => {
      menu.classList.toggle("menu-active");
    };

    btnMenu.addEventListener("click", handlerMenu);
    btnCloseMenu.addEventListener("click", handlerMenu);
    menuItems.forEach((element) =>
      element.addEventListener("click", handlerMenu)
    );
  };
  toggleMenu();
  //функция Планировщика задний

  const todoForm = document.querySelector(".todo-form"),
    todoInput = document.querySelector(".todo-input"),
    todoDate = document.querySelector(".todo-date"),
    todoList = document.querySelector(".todo-list");
  let alertAudio = new Audio();
  alertAudio.src = "../sound/alert.mp3";

  let todoLocalData = [];
  const todo = () => {
    //возвращает рандомный цвет
    const randomColor = () => {
      let hex = "#";
      const range = "ABCDEF0123456789";
      for (let i = 0; i < 6; i++) {
        hex += range.charAt(Math.floor(Math.random() * range.length));
      }
      return hex;
    };
    const checkDate = () => {
      const nowDate = new Date().getDate(),
        nowMonth = new Date().getMonth(),
        nowYear = new Date().getFullYear(),
        today = `${nowYear}-${nowMonth+1}-${nowDate}`;
        return today;
    };
    //вывод списка заданий на страницу
    const renderTodoList = () => {
      todoList.textContent = "";

      todoLocalData = localStorage.todoLocalData
        ? JSON.parse(localStorage.todoLocalData)
        : [];

      todoLocalData.forEach((item) => {
        const li = document.createElement("li");
        li.classList.add("todo-item");
        li.draggable = true;
        li.style.backgroundColor = item.background;
        li.innerHTML = `
        <span class="item-title" contenteditable="true">${item.name}</span>
        <span class="item-date">${item.date}</span>
        <button class="btn btn-delete"></button>
        `;
        if(item.date === checkDate() || item.date === ''){
          if (!item.completed) {
            todoList.append(li);
          }
        }

        const todoCompletedBtn = li;
        todoCompletedBtn.addEventListener("dblclick", () => {
          item.completed = !item.completed;
          let json = JSON.stringify(todoLocalData);
          localStorage.todoLocalData = json;
          renderTodoList();
        });
        const todoRemovedBtn = li.querySelector(".btn-delete");
        todoRemovedBtn.addEventListener("click", () => {
          todoLocalData.splice(todoLocalData.indexOf(item), 1);
          let json = JSON.stringify(todoLocalData);
          localStorage.todoLocalData = json;
          renderTodoList();
        });
      });
    };

    renderTodoList();
    checkDate();

    todoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!todoInput.value) {
        alertAudio.play();
        todoInput.style.borderBottom = "2px solid red";
        return;
      }
      todoInput.style.borderBottom = "1px solid rgba(0, 0, 0, 0.548)";
      const newTodo = {
        name: todoInput.value,
        date: todoDate.value,
        background: randomColor(),
        completed: false,
      };
      todoLocalData.push(newTodo);
      const json = JSON.stringify(todoLocalData);
      localStorage.todoLocalData = json;
      renderTodoList();
      todoForm.reset();
    });
  };
  todo();
});
