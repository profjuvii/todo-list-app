// GET request
async function loadTasksFromDB() {
    const url = "http://localhost:5001/tasks";

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Response status: ${response.status}`);
        return await response.json();

    } catch (err) {
        console.error(err.message);
        return [];
    }
}

// POST request
async function addNewTaskToDB(newTask) {
    const url = "http://localhost:5001/tasks";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        });

        if (!response.ok) throw new Error(`Response status: ${response.status}`);

        const json = await response.json();
        console.log("Task added:", json)

    } catch (err) {
        console.error("Error adding task:", err.message);
    }
}

// DELETE request
async function removeTaskFromDB(taskId) {
    const url = `http://localhost:5001/tasks/${taskId}`;

    try {
        const response = await fetch(url, { method: "DELETE" });
        if (!response.ok) throw new Error(`Response status: ${response.status}`);
        const json = await response.json();
        console.log(json.message);

    } catch (err) {
        console.error("Error deleting task:", err.message);
    }
}

// UPDATE request
async function updateTaskStatusOnDB(taskId, newStatus) {
    const url = `http://localhost:5001/tasks/${taskId}`;
    const body = { done: newStatus };

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) throw new Error(`Response status: ${response.status}`);

        const json = await response.json();
        console.log(json.message);

    } catch (err) {
        console.error("Error updating task:", err.message);
    }
}

// Function for adding a task on the page
function addNewTaskOnPage(taskId, taskContent, isCompleted) {
    let taskList = document.getElementById("task-list");
    const newTaskBlock = `
        <div class="task-area" id="${taskId}" data-id="${taskId}">
            <input type="checkbox" class="update-state" ${isCompleted ? "checked" : ""}>
            <span class="task-text" style="text-decoration: ${isCompleted ? 'line-through' : 'none'}">${taskContent}</span>
            <button class="del-btn">×</button>
        </div>
    `;
    taskList.insertAdjacentHTML("beforeend", newTaskBlock);
}

// Function for load tasks from DB on page
async function loadTasksOnPage() {
    document.getElementById("task-list").innerHTML = "";
    const tasks = await loadTasksFromDB();
    tasks.forEach(task => addNewTaskOnPage(task._id, task.text, task.done));
}

// Main process
document.addEventListener("DOMContentLoaded", async () => {
    // Load all tasks
    loadTasksOnPage();

    // Add button
    document.getElementById("add-btn").addEventListener("click", async () => {
        const newTaskInput = document.getElementById("input-area");
        if (newTaskInput.value) {
            await addNewTaskToDB({ text: newTaskInput.value });
            newTaskInput.value = "";
            loadTasksOnPage();
        }
    });

    // Delete button
    document.getElementById("task-list").addEventListener("click", (event) => {
        if (event.target && event.target.classList.contains("del-btn")) {
            const taskArea = event.target.closest(".task-area");
            const taskId = taskArea.id;

            removeTaskFromDB(taskId);
            taskArea.remove();
        }
    });

    // Checkbox state
    document.getElementById("task-list").addEventListener("click", (event) => {
        if (event.target && event.target.classList.contains("update-state")) {
            const taskArea = event.target.closest(".task-area");
            const taskId = taskArea.getAttribute("data-id");
            const isCompleted = event.target.checked;

            updateTaskStatusOnDB(taskId, isCompleted);
            taskArea.querySelector(".task-text").style.textDecoration = isCompleted ? "line-through" : "none";
        }
    });
});
