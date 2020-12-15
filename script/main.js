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
    todoInput = document.querySelector(".todo-input");
  const todoLocalData = [];
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
    //вывод списка заданий на страницу
    const renderTodoList = () => {};

    renderTodoList();

    todoForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const newTodo = {
        name: todoInput.value,
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
