let counter = 0
class tasks {
    constructor(taskToDo) {
        this.task = taskToDo;
        this.id = counter++;
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
    let label = document.createElement('label');
    label.setAttribute("for", "taskToDo");
    let text = document.createElement('input');
    text.setAttribute("type", "text");
    text.id = "taskTodo";
    let submit = document.createElement('input');
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Add task");
    submit.id = "submitBtn"
    //append
    header.appendChild(form);
    form.appendChild(headerForm);
    headerForm.appendChild(title);
    title.appendChild(document.createTextNode("Add new task"))
    headerForm.appendChild(closeBtn);
    closeBtn.appendChild(closeIcone);
    form.appendChild(label);
    label.appendChild(document.createTextNode("The task =>"))
    form.appendChild(text);
    form.appendChild(submit);
    //do
    submitNewTask();
    return form
}

function closeForm(){
    let form = document.querySelector(".newTaskForm");
    form.remove();
}

let editingTask = null;
function editTask(task) {
    taskForm();
    // Remplissez le formulaire avec le texte actuel de la tâche
    let taskText = task.querySelector('.listContainer-listToDo-task-text').textContent;
    document.getElementById('taskTodo').value = taskText;

    //indiquer qu'il s'agit d'une opération d'édition
    let btn = document.getElementById('submitBtn');
    btn.setAttribute("value", "Edit task");
    
    // Mettez à jour la tâche en cours d'édition
    editingTask = task;
}

function submitNewTask() {
    let submitBtn = document.getElementById("submitBtn");
    let taskToDo = document.getElementById("taskTodo");

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        if (editingTask) {
            editingTask.querySelector('.listContainer-listToDo-task-text').textContent = taskToDo.value;
            // Réinitialisez la variable d'édition
            editingTask = null;
        } else {
            // Sinon, créez une nouvelle tâche
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
    tasksArray.forEach(task => {
        CreateTask(task);
    });
}
loadTasksLocally();


function deleteTask(taskId) {
    let tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
    tasksArray = tasksArray.filter(task => task.id !== parseInt(taskId));
    localStorage.setItem('tasks', JSON.stringify(tasksArray));

    // Supprimer l'élément de la tâche du DOM
    let taskElement = document.getElementById('task_' + taskId);
    if (taskElement) {
        taskElement.remove();
    }
}



function setupEditTaskButtons() {
    let editTaskButtons = document.querySelectorAll('.listContainer-listToDo-task-editBtn');
    editTaskButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Extraire l'ID de l'élément parent (la tâche)
            let taskId = btn.parentNode.id.split('_')[1];
            // Trouver l'élément de la tâche dans le DOM
            let taskElement = document.getElementById('task_' + taskId);
            // Appeler la fonction d'édition avec l'ID extrait
            editTask(taskElement);
        });
    });
}
setupEditTaskButtons();


function setupDeleteTaskButtons() {
    let deleteTaskButtons = document.querySelectorAll('.listContainer-listToDo-task-deleteBtn');
    deleteTaskButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Extraire l'ID de l'élément parent (la tâche)
            let taskId = btn.parentNode.id.split('_')[1];
            deleteTask(taskId);
        });
    });
}
setupDeleteTaskButtons();

console.log(localStorage);
let clearBtn = document.getElementById("clearAllTaskBtn");
clearBtn.addEventListener('click', () => localStorage.clear)
let newTaskBtn = document.getElementById("newTaskBtn");
newTaskBtn.addEventListener('click', () => taskForm());
let closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener('click', () => closeForm()); 
