/* eslint-disable operator-linebreak */
/* eslint-disable arrow-parens */
"use sctrict";
window.addEventListener("DOMContentLoaded", () => {
  const toggleMenu = () => {
    const body = document.querySelector("body"),
      menu = document.querySelector(".menu");

    const handlerMenu = () => {
      menu.classList.toggle("menu-active");
    };

    body.addEventListener("click", (event) => {
      const target = event.target;
      if (target.closest(".menu-btn")) {
        handlerMenu();
      } else if (target.closest(".close-btn")) {
        handlerMenu();
      } else if (target.closest(".menu-items>li")) {
        handlerMenu();
      } else if (
        !target.closest(".menu-active") &&
        menu.classList.contains("menu-active")
      ) {
        handlerMenu();
      }
    });
  };
  toggleMenu();
  //функция записной книги

  const todoForm = document.querySelector(".todo-form"),
    todoInput = document.querySelector(".todo-input"),
    todoDate = document.querySelector(".todo-date"),
    todoList = document.querySelector(".todo-list");
  const alertAudio = new Audio();
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
    //возваращет теушую дату в формате YYYY-MM-DD
    const requestTodayDate = () => {
      const nowDate = new Date().getDate(),
        nowMonth = new Date().getMonth(),
        nowYear = new Date().getFullYear(),
        today = `${nowYear}-${nowMonth + 1}-${nowDate}`;
      return today;
    };
    //сохранение в localStorage
    const saveLocalStorage = (todoLocalData) => {
      const json = JSON.stringify(todoLocalData);
      localStorage.todoLocalData = json;
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
        <span class="item-title" >${item.name}</span>
        <span class="item-date">${item.date}</span>
        <button class="btn btn-delete"></button>
        `;
        if (item.date === requestTodayDate() || item.date === "") {
          if (!item.completed) {
            todoList.append(li);
          }
        }
        const todoCompletedBtn = li;
        todoCompletedBtn.addEventListener("dblclick", () => {
          item.completed = !item.completed;
          saveLocalStorage(todoLocalData);
          renderTodoList();
        });
        const todoRemovedBtn = li.querySelector(".btn-delete");
        todoRemovedBtn.addEventListener("click", () => {
          todoLocalData.splice(todoLocalData.indexOf(item), 1);
          saveLocalStorage(todoLocalData);
          renderTodoList();
        });
      });
    };

    renderTodoList();
    requestTodayDate();

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
      saveLocalStorage(todoLocalData);
      todoForm.reset();
      renderTodoList();
    });
  };

  todo();
});
