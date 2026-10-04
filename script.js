const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progressBar");
const totalTasksDisplay = document.getElementById("totalTasks");
const completedTasksDisplay = document.getElementById("completedTasks");

const TRASH_ICON = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/>
    </svg>`;

// The tasks array is the single source of truth; the page is drawn from it
let tasks = loadTasks();
render();

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text === "") return;

    tasks.push({ id: Date.now(), text, completed: false });
    taskInput.value = "";
    update();
});

// Event delegation: one listener for the whole list
taskList.addEventListener("change", (e) => {
    if (!e.target.classList.contains("check")) return;
    const id = Number(e.target.closest("li").dataset.id);
    const task = tasks.find((t) => t.id === id);
    task.completed = e.target.checked;
    update();
});

taskList.addEventListener("click", (e) => {
    const btn = e.target.closest(".delete");
    if (!btn) return;
    const id = Number(btn.closest("li").dataset.id);
    tasks = tasks.filter((t) => t.id !== id);
    update();
});

function update() {
    saveTasks();
    render();
}

function render() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.dataset.id = task.id;
        li.classList.toggle("completed", task.completed);

        // Fixed markup only; user text is added below with textContent (safe)
        li.innerHTML = `
            <div class="task-content">
                <input type="checkbox" class="check" aria-label="Mark task as done" ${task.completed ? "checked" : ""}>
                <span class="task-text"></span>
            </div>
            <button type="button" class="delete" aria-label="Delete task">${TRASH_ICON}</button>
        `;

        li.querySelector(".task-text").textContent = task.text;
        taskList.appendChild(li);
    });

    const total = tasks.length;
    const done = tasks.filter((t) => t.completed).length;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);

    totalTasksDisplay.textContent = total;
    completedTasksDisplay.textContent = done;
    progressBar.style.width = percent + "%";
    progress.setAttribute("aria-valuenow", percent);
    emptyState.hidden = total > 0;
}

function saveTasks() {
    try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (err) {
        console.error("Could not save tasks:", err);
    }
}

function loadTasks() {
    try {
        const saved = JSON.parse(localStorage.getItem("tasks"));
        if (!Array.isArray(saved)) return [];
        return saved.map((t, i) => ({
            id: t.id ?? Date.now() + i, // older saved tasks had no id
            text: String(t.text),
            completed: Boolean(t.completed),
        }));
    } catch (err) {
        return [];
    }
}