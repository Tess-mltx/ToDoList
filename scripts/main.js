class tasks {
    constructor(taskToDo) {
        this.task = taskToDo;
    }

}

function CreateTask(taskToDo){
    //exist
    let listToDo = document.querySelector(".listContainer-listToDo");
    //create
    let task = document.createElement('li')
    task.classList.add('listContainer-listToDo-task')
    let checkbox = document.createElement('input');
    checkbox.classList.add('listContainer-listToDo-task-ckeckbox')
    let text = document.createElement('input');
    text.classList.add('listContainer-listToDo-task-text')
    let edit = document.createElement('button');
    edit.classList.add('listContainer-listToDo-task-editBtn')
    let deleteTask = document.createElement('button');
    deleteTask.classList.add('listContainer-listToDo-task-deleteBtn')
    //append
    listToDo.appendChild(task);
    task.appendChild(checkbox);
    task.appendChild(text);
    task.appendChild(edit);
    task.appendChild(deleteTask);

    return task;
}



function taskForm(){
    //exist
    let header = document.querySelector('.header');
    //create
    let sectionForm = document.createElement('section');
    let hgroup = document.createElement('hgroup');
    let title = document.createElement('h2');
    let close = document.createElement('button');
    let closeIcone = document.createElement('i');
    let label = document.createElement('label');
    label.setAttribute("for", "taskToDo");
    let text = document.createElement('input');
    text.setAttribute("type", "text");
    text.setAttribute("id", "taskTodo");
    let submit = document.createElement('input');
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Add task");
    //append
    header.appendChild(sectionForm);
    sectionForm.appendChild(hgroup);
    hgroup.appendChild(title);
    title.appendChild(document.createTextNode("Add new task"))
    hgroup.appendChild(close);
    close.appendChild(closeIcone);
    closeIcone.classList.add("fa-solid", "fa-xmark")
    sectionForm.appendChild(label);
    label.appendChild(document.createTextNode("The task =>"))
    sectionForm.appendChild(text);
    sectionForm.appendChild(submit);

    return(sectionForm)
}

function displayForm() {
    let newTask = document.getElementById('newTask');
    newTask.addEventListener('click', () => taskForm());
}
displayForm();