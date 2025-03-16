// GET request
async function getRequest() {
    try {
        const res = await fetch("http://localhost:3000/getTasks");
        if (!res.ok) throw new Error(`Response status: ${res.status}`);
        return res.json();

    } catch (error) {
        console.error("Failed to load tasks:", error.message);
        return null;
    }
}

// POST request
async function postRequest(text) {
    try {
        const res = await fetch("http://localhost:3000/addNewTask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: text }),
        });

        if (!res.ok) throw new Error(`Response status: ${res.status}`);

        const json = await res.json();
        console.log(json.message);
        return json.newTask;

    } catch (error) {
        console.error("Failed to add new task:", error.message);
        return null;
    }
}

// DELETE request
async function deleteRequest(taskId) {
    try {
        const res = await fetch(`http://localhost:3000/deleteTask/${taskId}`,
            { method: "DELETE" }
        );

        if (!res.ok) throw new Error(`Response status: ${res.status}`);

        const json = await res.json();
        console.log(json.message);

    } catch (error) {
        console.error("Failed to delete task:", error.message);
    }
}

// PATCH request
async function patchRequest(taskId, newState) {
    try {
        const res = await fetch(`http://localhost:3000/changeTaskState/${taskId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ done: newState }),
        });

        if (!res.ok) throw new Error(`Response status: ${res.status}`);

        const json = await res.json();
        console.log(json.message);

    } catch (error) {
        console.error("Failed to change task state:", error.message);
    }
}

// Function for adding a task on the page
function addNewTaskOnPage(taskId, taskText, isDone) {
    let taskList = document.getElementById("task-list");
    const newTaskBlock = `
        <div class="task-area" id="${taskId}"">
            <input type="checkbox" class="update-state" ${isDone ? "checked" : ""}>
            <span class="task-text" style="text-decoration: ${isDone ? 'line-through' : 'none'}">${taskText}</span>
            <button class="del-btn">×</button>
        </div>
    `;
    taskList.insertAdjacentHTML("afterbegin", newTaskBlock);
}

// Function for load tasks from DB on page
async function loadTasksOnPage() {
    const taskListBlock = document.createElement("div");
    taskListBlock.id = "task-list";
    document.getElementById("add-task-area").insertAdjacentElement("afterend", taskListBlock);

    const tasks = await getRequest();
    if (tasks) {
        tasks.forEach(task => addNewTaskOnPage(task._id, task.text, task.done));
    }
}

// Main process
document.addEventListener("DOMContentLoaded", async () => {
    // Load all tasks
    await loadTasksOnPage();

    // Add button
    document.getElementById("add-btn").addEventListener("click", async () => {
        const newTaskInput = document.getElementById("input-area");
        if (newTaskInput.value && newTaskInput.value.trim()) {
            const newTask = await postRequest(newTaskInput.value);
            
            newTaskInput.value = "";
            addNewTaskOnPage(newTask._id, newTask.text, newTask.done);
        }
    });

    // Delete button
    document.getElementById("task-list").addEventListener("click", (event) => {
        if (event.target && event.target.classList.contains("del-btn")) {
            const taskArea = event.target.closest(".task-area");
            const taskId = taskArea.id;

            deleteRequest(taskId);
            taskArea.remove();
        }
    });

    // Checkbox state
    document.getElementById("task-list").addEventListener("click", (event) => {
        if (event.target && event.target.classList.contains("update-state")) {
            const taskArea = event.target.closest(".task-area");
            const taskId = taskArea.id;
            const isCompleted = event.target.checked;

            patchRequest(taskId, isCompleted);
            taskArea.querySelector(".task-text").style.textDecoration = isCompleted ? "line-through" : "none";
        }
    });
});
