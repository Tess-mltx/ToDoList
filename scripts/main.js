let counter
function getTheID () {
    let arrayTask = localStorage.tasks
    if (localStorage.getItem('tasks') !== null) {
        counter = parseInt(arrayTask.length)
    } else {
        counter = 0
    }
    return counter
}
getTheID()

class tasks {
    constructor(taskToDo) {
        this.task = taskToDo;
        this.id = counter++;
        this.isDone = false;
    }

}

function CreateTask(newTask){
    //exist
    let listToDo = document.querySelector(".listContainer-listToDo");
    //create
    let task = document.createElement('li')
    task.id = 'task_' + newTask.id
    task.classList.add('listContainer-listToDo-task')
    let checkbox = document.createElement('input');
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = newTask.isDone;
    checkbox.classList.add('listContainer-listToDo-task-ckeckbox')
    let text = document.createElement('p');
    text.classList.add('listContainer-listToDo-task-text')
    let edit = document.createElement('button');
    edit.classList.add('listContainer-listToDo-task-editBtn')
    let editIcone = document.createElement('i')
    editIcone.classList.add("fa-solid", "fa-pencil")
    let deleteTask = document.createElement('button');
    deleteTask.classList.add('listContainer-listToDo-task-deleteBtn')
    let deleteIcone = document.createElement('i');
    deleteIcone.classList.add("fa-solid", "fa-trash")
    //append
    listToDo.appendChild(task);
    task.appendChild(checkbox);
    task.appendChild(text);
    text.appendChild(document.createTextNode(newTask.task))
    task.appendChild(edit);
    edit.appendChild(editIcone);
    task.appendChild(deleteTask);
    deleteTask.appendChild(deleteIcone);

    return task;
}



function taskForm(){
    //exist
    let header = document.querySelector('.header');
    //create
    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    let form = document.createElement('form');
    form.classList.add("newTaskForm")
    let headerForm = document.createElement('header');
    headerForm.classList.add("newTaskForm-header")
    let title = document.createElement('h2');
    let closeBtn = document.createElement('button');
    closeBtn.classList.add("newTaskForm-header-closeBtn")
    closeBtn.id = "closeBtn"
    let closeIcone = document.createElement('i');
    closeIcone.classList.add("fa-solid", "fa-xmark")
    let text = document.createElement('input');
    text.setAttribute("type", "text");
    text.id = "taskTodo";
    let submit = document.createElement('input');
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Add task");
    submit.id = "submitBtn"
    //append
    header.appendChild(form);
    header.appendChild(overlay);
    form.appendChild(headerForm);
    headerForm.appendChild(title);
    title.appendChild(document.createTextNode("Add new task"))
    headerForm.appendChild(closeBtn);
    closeBtn.appendChild(closeIcone);
    form.appendChild(text);
    form.appendChild(submit);
    //do
    submitNewTask();
    return form
}

function closeForm(){
    let form = document.querySelector(".newTaskForm");
    let overlay = document.querySelector(".overlay")
    form.remove();
    overlay.remove();
}

let editingTask = null;

function editTask(task) {
    taskForm();
    let taskText = task.querySelector('.listContainer-listToDo-task-text').textContent;
    document.getElementById('taskTodo').value = taskText;

    let btn = document.getElementById('submitBtn');
    btn.setAttribute("value", "Edit task");
    
    editingTask = task;
}

function submitNewTask() {
    let submitBtn = document.getElementById("submitBtn");
    let taskToDo = document.getElementById("taskTodo");

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        if (editingTask) {
            let tasksArray = JSON.parse(localStorage.getItem('tasks')) || []; // <=== on va cherche l'array tasks ou un array vide
            let editedTask = tasksArray.find(task => task.id === parseInt(editingTask.id.split('_')[1])); // <=== chercher la task via son ID
            if (editedTask) {
                editedTask.task = taskToDo.value;
                localStorage.setItem('tasks', JSON.stringify(tasksArray)); //  <=== Sauvegarde de l'array
            }

            editingTask = null;
            location.reload();
        } else {
            let newTask = new tasks(taskToDo.value);
            CreateTask(newTask);
            saveTaskLocally(newTask);
        }
        closeForm();
    });
}



function saveTaskLocally(task) {
    let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
    tasksArray.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

function loadTasksLocally() {
    let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
    // Sort tasks based on isDone (completed tasks last)
    tasksArray.sort((a, b) => (a.isDone === b.isDone) ? 0 : a.isDone ? 1 : -1);
    tasksArray.forEach(task => {
        CreateTask(task);
    });
}
loadTasksLocally();


function deleteTask(taskId) {
    let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
    tasksArray = tasksArray.filter(task => task.id !== parseInt(taskId));
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
    let taskElement = document.getElementById('task_' + taskId);
    if (taskElement) {
        taskElement.remove();
    }
}



function setupCheckedTaskBtn() {
    let CheckedTaskBtn = document.querySelectorAll('.listContainer-listToDo-task-ckeckbox');
    
    CheckedTaskBtn.forEach(btn => {
        let taskId = btn.parentNode.id.split('_')[1];
        let taskElement = document.getElementById('task_' + taskId);
        let ul = document.querySelector('.listContainer-listToDo');

        btn.addEventListener('change', function() {
            if (this.checked) {
              taskElement.classList.add("done");
              ul.append(taskElement)

            } else {
              taskElement.classList.remove("done")
            }

            let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
            let task = tasksArray.find(task => task.id === parseInt(taskId));
            if (task) {
                task.isDone = this.checked;
                localStorage.setItem('tasks', JSON.stringify(tasksArray));
            }
          });
    });
}
setupCheckedTaskBtn();



function setupEditTaskButtons() {
    let editTaskButtons = document.querySelectorAll('.listContainer-listToDo-task-editBtn');
    editTaskButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            let taskId = btn.parentNode.id.split('_')[1];
            let taskElement = document.getElementById('task_' + taskId);
            editTask(taskElement);
        });
    });
}
setupEditTaskButtons();


function setupDeleteTaskButtons() {
    let deleteTaskButtons = document.querySelectorAll('.listContainer-listToDo-task-deleteBtn');
    deleteTaskButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            let taskId = btn.parentNode.id.split('_')[1];
            deleteTask(taskId);
        });
    });
}
setupDeleteTaskButtons();

function clearAllTasks() {
    localStorage.clear()
    location.reload()
}


let clearBtn = document.getElementById("clearAllTaskBtn");
clearBtn.addEventListener('click', () => clearAllTasks())
let newTaskBtn = document.getElementById("newTaskBtn");
newTaskBtn.addEventListener('click', () => taskForm());
let closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener('click', () => closeForm()); 
