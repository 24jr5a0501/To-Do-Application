document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Load tasks from localStorage
    loadTasks();

    addTaskBtn.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const listItem = document.createElement("li");

        const taskSpan = document.createElement("span");
        taskSpan.textContent = taskText;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

        editBtn.addEventListener("click", () => {
            const confirmChange = confirm("Confirm to Change!");
            if (confirmChange) {
                editTask(taskSpan);
            } else {
                console.log("Change cancelled");
            }
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", () => {
            listItem.remove();
            saveTasks(); 
        });

        listItem.appendChild(taskSpan);
        listItem.appendChild(editBtn);
        listItem.appendChild(deleteBtn);
        taskList.appendChild(listItem);

        taskInput.value = "";

        saveTasks();
    }

    function editTask(taskSpan) {
        const newTask = prompt("Edit your task:", taskSpan.textContent);
        if (newTask !== null) {
            taskSpan.textContent = newTask.trim();
            saveTasks(); 
        }
    }

    function saveTasks() {
        const tasks = [];
        const taskItems = taskList.querySelectorAll("li");

        taskItems.forEach(item => {
            const taskText = item.querySelector("span").textContent;
            tasks.push(taskText);
        });

        // Save the tasks in localStorage as a string
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        // Load tasks from localStorage if any exist
        const tasks = JSON.parse(localStorage.getItem("tasks"));

        if (tasks && tasks.length > 0) {
            tasks.forEach(taskText => {
                const listItem = document.createElement("li");

                const taskSpan = document.createElement("span");
                taskSpan.textContent = taskText;

                const editBtn = document.createElement("button");
                editBtn.textContent = "Edit";
                editBtn.classList.add("edit-btn");

                // Edit button functionality
                editBtn.addEventListener("click", () => {
                    const confirmChange = confirm("Confirm to Change!");
                    if (confirmChange) {
                        editTask(taskSpan);
                    } else {
                        console.log("Change cancelled");
                    }
                });

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "Delete";
                deleteBtn.classList.add("delete-btn");

                // Delete button functionality
                deleteBtn.addEventListener("click", () => {
                    listItem.remove();
                    saveTasks();  // Save the updated list after deletion
                });

                listItem.appendChild(taskSpan);
                listItem.appendChild(editBtn);
                listItem.appendChild(deleteBtn);
                taskList.appendChild(listItem);
            });
        }
    }
});
