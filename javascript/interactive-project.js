let taskInput =
document.getElementById("taskInput");

let addTaskButton =
document.getElementById("addTaskButton");

let taskList =
document.getElementById("taskList");

let message =
document.getElementById("message");

let tasks = 
JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks",
        JSON.stringify(tasks));
    }

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        let listItem =
        document.createElement("li");

        let checkbox =
        document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked =
        task.completed;

        let taskText =
        document.createElement("span");
        taskText.textContent = task.text;

        if (task.completed) {
            taskText.style.color = "green";
        } else {
            taskText.style.color = "black";
        }

        checkbox.addEventListener("change",
            function() {
                task.completed = checkbox.checked;
                saveTasks();
                displayTasks();
            });
        
        let editButton =
        document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("editButton");

        editButton.addEventListener("click",
            function() {

                if (editButton.textContent ===
                    "Edit") {
                 
                let editInput = 
                document.createElement("input");
                editInput.type = "text";
                editInput.value = task.text;
            
            listItem.replaceChild(editInput, taskText);
            
            editButton.textContent = "Save";
                    } else {
                        let editInput =
                        listItem.querySelector('input[type="text"]');
                        let updatedTask = editInput.value.trim();
                    if (updatedTask === "") {
                        message.textContent =
                    "Task cannot be empty!";
                    return;
                    }
                    task.text = updatedTask;
                    message.textContent = "";

                    saveTasks();
                    displayTasks();
                    }
        });

        let deleteButton =
        document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });
    
    listItem.appendChild(checkbox);

    listItem.appendChild(taskText);

    listItem.appendChild(editButton);

    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
        
    });
}

addTaskButton.addEventListener("click", function() {
    let task = taskInput.value.trim();

    if (task === "") {
        message.textContent = "Please enter a task!";
        return;
    }

    message.textContent = "";

    tasks.push({
        text: task,
        completed: false
    });

    saveTasks();
    displayTasks();

    taskInput.value = "";
});

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTaskButton.click();
    }
});

displayTasks();
