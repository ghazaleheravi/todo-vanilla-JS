const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.select-filter');

function addTodo(e) {
  e.preventDefault();
  
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  if(todoInput.value === ''){
    window.alert('fill out the form with what you need to be done!');
  } 
  newTodo.classList.add('todo-li');
  todoDiv.appendChild(newTodo);

  rememberTodos(todoInput.value);

  todoInput.value = '';

  const completedBtn = document.createElement('button');
  completedBtn.innerHTML = '<i class="fas fa-check"></i>';
  completedBtn.setAttribute('class', 'complete-btn');
  //or completedBtn.classList.add('complete-btn');
  todoDiv.appendChild(completedBtn);  

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
  deleteBtn.classList.add('delete-btn');
  todoDiv.appendChild(deleteBtn);  

  todoList.appendChild(todoDiv);
}

function deleteAndCheck(e) {
  if(e.target && e.target.matches("button.delete-btn")) {
    let parentOfDlt = e.target.parentNode;
    parentOfDlt.classList.add('fall');
    parentOfDlt.ontransitionend = fall;
    //remove from localStorage
    forgetTodos(parentOfDlt.childNodes[0].innerHTML);
    function fall() {
      parentOfDlt.remove(parentOfDlt);
    }
  }
  if(e.target && e.target.classList[0] === 'complete-btn') {
    let parentOfCom = e.target.parentNode;
    parentOfCom.classList.toggle('completed');
  }
  
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(todo => {
    if (e.target.value === 'completed' && todo.classList.value === 'todo completed') {
      todo.style.display = 'flex';
    }
    if (e.target.value === 'completed' && todo.classList.value === 'todo') {
      todo.style.display = 'none';
    }
    if (e.target.value ==='uncompleted' && todo.classList.value === 'todo completed') {
      todo.style.display = 'none';
    }
    if (e.target.value ==='uncompleted' && todo.classList.value === 'todo') {
      todo.style.display = 'flex';
    }
    if (e.target.value === 'all') {
      todo.style.display = 'flex';
    }
  })
}

function rememberTodos(input) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(input);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function displayTodos() {
  let todos;
  if (!localStorage.getItem('todos')) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
    todos.forEach(input => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    const newTodo = document.createElement('li');
    newTodo.innerText = input;
 
    newTodo.classList.add('todo-li');
    todoDiv.appendChild(newTodo);

    todoInput.value = '';
    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.setAttribute('class', 'complete-btn');
    //or completedBtn.classList.add('complete-btn');
    todoDiv.appendChild(completedBtn);  

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
    deleteBtn.classList.add('delete-btn');
    todoDiv.appendChild(deleteBtn);  

    todoList.appendChild(todoDiv);
  })
  }
}

function forgetTodos(input) {
  console.log('input', input);
  if (!localStorage.getItem(input)) {
    let todos = JSON.parse(localStorage.getItem('todos'));
    console.log('todos', todos);
    //deleteing from array
    todos.splice(todos.indexOf(input), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}


todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteAndCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', displayTodos);