const columns = {
  todo: document.querySelector("#todoList"),
  progress: document.querySelector("#progressList"),
  done: document.querySelector("#doneList"),
};

const counts = {
  todo: document.querySelector("#todoCount"),
  progress: document.querySelector("#progressCount"),
  done: document.querySelector("#doneCount"),
};

const totalTasks = document.querySelector("#totalTasks");
const doneTasks = document.querySelector("#doneTasks");
const progressPercent = document.querySelector("#progressPercent");
const searchInput = document.querySelector("#searchInput");
const filterChips = document.querySelectorAll(".filter-chip");
const taskModal = document.querySelector("#taskModal");
const taskForm = document.querySelector("#taskForm");
const themeToggle = document.querySelector("#themeToggle");
const themeIcon = document.querySelector("#themeIcon");
const themeLabel = document.querySelector("#themeLabel");

let tasks = loadTasks();
let activeFilter = "all";

function getFilteredTasks() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  return tasks.filter((task) => {
    const priorityMatches = activeFilter === "all" || task.priority === activeFilter;
    const searchableText = [task.title, task.notes, task.priority, task.status, ...task.tags]
      .join(" ")
      .toLowerCase();

    return priorityMatches && searchableText.includes(searchTerm);
  });
}

function renderBoard() {
  const filteredTasks = getFilteredTasks();

  Object.values(columns).forEach((column) => {
    column.innerHTML = "";
  });

  Object.keys(columns).forEach((status) => {
    const statusTasks = filteredTasks.filter((task) => task.status === status);

    if (statusTasks.length === 0) {
      columns[status].append(createEmptyState(status));
      return;
    }

    statusTasks.forEach((task) => {
      columns[status].append(createTaskCard(task));
    });
  });

  updateStats();
}

function createTaskCard(task) {
  const card = document.createElement("article");
  card.className = "task-card";
  card.dataset.taskId = task.id;

  card.innerHTML = `
    <div class="task-topline">
      <span class="priority ${task.priority}">${task.priority}</span>
      <button class="icon-button delete-task" type="button" aria-label="Delete ${escapeHtml(task.title)}">X</button>
    </div>
    <h3>${escapeHtml(task.title)}</h3>
    <p>${escapeHtml(task.notes || "No extra notes added.")}</p>
    <div class="tag-list">
      ${task.tags.map((tag) => `<span class="tag">#${escapeHtml(tag)}</span>`).join("")}
    </div>
    <div class="task-footer">
      <span>${formatStatus(task.status)}</span>
      <span>${formatDate(task.createdAt)}</span>
    </div>
  `;

  card.querySelector(".delete-task").addEventListener("click", () => {
    tasks = tasks.filter((savedTask) => savedTask.id !== task.id);
    saveTasks(tasks);
    renderBoard();
  });

  makeCardDraggable(card, task.id);
  return card;
}

function createEmptyState(status) {
  const emptyState = document.createElement("div");
  emptyState.className = "empty-state";
  emptyState.textContent = `No ${formatStatus(status).toLowerCase()} tasks here.`;
  return emptyState;
}

function updateStats() {
  const groupedCounts = tasks.reduce(
    (result, task) => {
      result[task.status] += 1;
      return result;
    },
    { todo: 0, progress: 0, done: 0 }
  );

  counts.todo.textContent = groupedCounts.todo;
  counts.progress.textContent = groupedCounts.progress;
  counts.done.textContent = groupedCounts.done;

  totalTasks.textContent = tasks.length;
  doneTasks.textContent = groupedCounts.done;
  progressPercent.textContent = tasks.length
    ? `${Math.round((groupedCounts.done / tasks.length) * 100)}%`
    : "0%";
}

function addTask(event) {
  event.preventDefault();

  const task = {
    id: createId(),
    title: document.querySelector("#taskTitle").value.trim(),
    notes: document.querySelector("#taskNotes").value.trim(),
    priority: document.querySelector("#taskPriority").value,
    status: document.querySelector("#taskStatus").value,
    tags: document
      .querySelector("#taskTags")
      .value.split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean)
      .slice(0, 4),
    createdAt: Date.now(),
  };

  tasks = [task, ...tasks];
  saveTasks(tasks);
  taskForm.reset();
  taskModal.close();
  renderBoard();
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeIcon.textContent = "Theme";
  themeLabel.textContent = theme === "dark" ? "Light" : "Dark";
  saveTheme(theme);
}

function moveTask(taskId, nextStatus) {
  tasks = tasks.map((task) => (task.id === taskId ? { ...task, status: nextStatus } : task));
  saveTasks(tasks);
  renderBoard();
}

function formatStatus(status) {
  const names = {
    todo: "To Do",
    progress: "In Progress",
    done: "Done",
  };

  return names[status] || status;
}

function formatDate(timestamp) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(timestamp);
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

document.querySelector("#openTaskModal").addEventListener("click", () => {
  taskModal.showModal();
  document.querySelector("#taskTitle").focus();
});

document.querySelector("#closeTaskModal").addEventListener("click", () => taskModal.close());

document.querySelector("#resetDemo").addEventListener("click", () => {
  tasks = resetTasks();
  taskModal.close();
  renderBoard();
});

taskForm.addEventListener("submit", addTask);
searchInput.addEventListener("input", renderBoard);

filterChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    filterChips.forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");
    activeFilter = chip.dataset.filter;
    renderBoard();
  });
});

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(nextTheme);
});

enableDragAndDrop({
  taskLists: Object.values(columns),
  onTaskMoved: moveTask,
});

setTheme(loadTheme());
renderBoard();
