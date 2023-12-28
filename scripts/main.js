class tasks {
    constructor(taskToDo) {
        this.task = taskToDo;
    }

}

function CreateTask(newTask){
    //exist
    let listToDo = document.querySelector(".listContainer-listToDo");
    //create
    let task = document.createElement('li')
    task.classList.add('listContainer-listToDo-task')
    let checkbox = document.createElement('input');
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add('listContainer-listToDo-task-ckeckbox')
    let text = document.createElement('p');
    text.classList.add('listContainer-listToDo-task-text')
    let edit = document.createElement('button');
    edit.classList.add('listContainer-listToDo-task-editBtn')
    let deleteTask = document.createElement('button');
    deleteTask.classList.add('listContainer-listToDo-task-deleteBtn')
    //append
    listToDo.appendChild(task);
    task.appendChild(checkbox);
    task.appendChild(text);
    text.appendChild(document.createTextNode(newTask.task))
    task.appendChild(edit);
    task.appendChild(deleteTask);

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
    closeForm();
    submitNewTask();
    return form
}

function displayForm() {
    let newTaskBtn = document.getElementById("newTaskBtn");
    newTaskBtn.addEventListener('click', () => taskForm());
}
displayForm();

function closeForm(){
    let closeBtn = document.getElementById("closeBtn");
    let form = document.querySelector(".newTaskForm");
    closeBtn.addEventListener('click', () => form.remove());
}


function submitNewTask() {
    let submitBtn = document.getElementById("submitBtn");
    let taskToDo = document.getElementById("taskTodo");
    let newTask;

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        newTask = new tasks(taskToDo.value);
        console.log(newTask);
        CreateTask(newTask);
    });

    return newTask;
}