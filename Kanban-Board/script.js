const addTaskBtn=document.getElementById("addTaskBtn");
const taskModal=document.getElementById("taskModal");
const modalTitle=document.getElementById("modalTitle");
const taskInput=document.getElementById("taskInput");
const saveBtn=document.getElementById("saveBtn");
const cancelBtn=document.getElementById("cancelBtn");

const todoList=document.querySelector("#todo .task-list");
const progressList=document.querySelector("#progress .task-list");
const doneList=document.querySelector("#done .task-list");

let editTask=null;

addTaskBtn.addEventListener("click",openAddModal);
cancelBtn.addEventListener("click",closeModal);

taskModal.addEventListener("click",e=>{
    e.preventDefault();
    if(e.target===taskModal){
        closeModal();
    }
});

saveBtn.addEventListener("click",saveTask);

taskInput.addEventListener("keydown",e=>{
    if(e.key==="Enter"){
        saveTask();
    }
});

function openAddModal(){

    modalTitle.textContent="Add Task";
    taskInput.value="";
    editTask=null;

    taskModal.classList.add("active");

    setTimeout(()=>{
        taskInput.focus();
    },100);

}

function closeModal(){
    taskModal.classList.remove("active");
}

function saveTask(){
    const text=taskInput.value.trim();
    if(text==="") return;
    if(editTask){
        editTask.querySelector("h3").textContent=text;
    }
    else{
        const task=createTask(text);
        todoList.append(task);
    }
    editTask=null;
    taskInput.value="";
    closeModal();
    updateCounter();
    checkEmpty();
    saveTasks();
}

function createTask(text){
    const task=document.createElement("div");
    task.className="task";
    task.draggable=true;
    task.innerHTML=`
        <h3>${text}</h3>

        <div class="task-actions">
            <button class="edit-btn">
                <i class="ri-edit-line"></i>
            </button>

            <button class="delete-btn">
                <i class="ri-delete-bin-line"></i>
            </button>
        </div>
    `;

    const editBtn=task.querySelector(".edit-btn");
    const deleteBtn=task.querySelector(".delete-btn");

    editBtn.addEventListener("click",()=>{
        editTask=task;
        modalTitle.textContent="Edit Task";
        taskInput.value=task.querySelector("h3").textContent;
        taskModal.classList.add("active");
        taskInput.focus();
    });

    deleteBtn.addEventListener("click",()=>{
        if(confirm("Delete this task?")){
            task.remove();
            updateCounter();
            checkEmpty();
            saveTasks();
        }
    });
    return task;
}

function updateCounter(){
    document.querySelector("#todo .count").textContent=
    todoList.querySelectorAll(".task").length;

    document.querySelector("#progress .count").textContent=
    progressList.querySelectorAll(".task").length;

    document.querySelector("#done .count").textContent=
    doneList.querySelectorAll(".task").length;
}

function checkEmpty(){

    document.querySelectorAll(".task-list").forEach(list=>{
        const empty=list.querySelector(".empty");
        if(list.querySelector(".task")){
            empty.style.display="none";
        }
        else{
            empty.style.display="block";
        }
    });
}

updateCounter();
checkEmpty();

const taskLists=document.querySelectorAll(".task-list");

let draggedTask=null;

document.addEventListener("dragstart",e=>{
    if(!e.target.classList.contains("task")) return;
    draggedTask=e.target;
    e.target.classList.add("dragging");
});

document.addEventListener("dragend",e=>{
    if(!e.target.classList.contains("task")) return;
    e.target.classList.remove("dragging");
    draggedTask=null;
});

taskLists.forEach(list=>{
    list.addEventListener("dragover",e=>{
        e.preventDefault();
    });

    list.addEventListener("drop",()=>{
        if(!draggedTask) return;
        list.appendChild(draggedTask);
        updateCounter();
        checkEmpty();
        saveTasks();
    });
});

function getTasks(list){
    return [...list.querySelectorAll(".task")].map(task=>{
        return task.querySelector("h3").textContent;
    });
}

function saveTasks(){
    const data={
        todo:getTasks(todoList),
        progress:getTasks(progressList),
        done:getTasks(doneList)
    };
    localStorage.setItem("kanbanTasks",JSON.stringify(data));
}

function loadTasks(){
    const data=JSON.parse(localStorage.getItem("kanbanTasks"));
    if(!data) return;
    todoList.innerHTML='<p class="empty">No tasks yet</p>';
    progressList.innerHTML='<p class="empty">No tasks yet</p>';
    doneList.innerHTML='<p class="empty">No tasks yet</p>';
    data.todo.forEach(task=>{
        todoList.append(createTask(task));
    });

    data.progress.forEach(task=>{
        progressList.append(createTask(task));
    });

    data.done.forEach(task=>{
        doneList.append(createTask(task));
    });

    updateCounter();
    checkEmpty();
}

loadTasks();