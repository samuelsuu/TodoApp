const todoList = document.getElementById("todoList");
const addTodoButton = document.getElementById("addTodoButton");
const newTodoInput = document.getElementById("newTodoInput");

let todos = [];

function addTodo() {
  const text = newTodoInput.value.trim();
  if (text) {
    const todo = { id: Date.now(), text, completed: false };
    todos.push(todo);
    newTodoInput.value = "";
    renderTodoList();
  }
}

function editTodoById(id, newText) {
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos[index].text = newText;
    renderTodoList();
  }
}

function deleteTodoById(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodoList();
}

function toggleTodoCompleted(id) {
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos[index].completed = !todos[index].completed;
    renderTodoList();
  }
}

function renderTodoList() {
  todoList.innerHTML = "";
  todos.forEach(todo => {
    const todoItem = document.createElement("li");
    todoItem.innerHTML = `
      <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
      <div class="too">
      <button class="editButton" data-id="${todo.id}"><i class='bx bx-edit'></i></button>
      <button class="deleteButton" data-id="${todo.id}"><i class='bx bx-trash' ></i></button>
      </div>
      
    `;
    todoItem.querySelector(".editButton").addEventListener("click", () => {
      const newTodoText = prompt("Edit the todo:", todo.text);
      if (newTodoText !== null) {
        editTodoById(todo.id, newTodoText);
      }
    });
    todoItem.querySelector(".deleteButton").addEventListener("click", () => {
      deleteTodoById(todo.id);
    });
    todoItem.querySelector("span").addEventListener("click", () => {
      toggleTodoCompleted(todo.id);
    });
    todoList.appendChild(todoItem);
  });
}

addTodoButton.addEventListener("click", addTodo);
