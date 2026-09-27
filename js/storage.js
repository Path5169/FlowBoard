const STORAGE_KEY = "flowboard.tasks.v1";
const THEME_KEY = "flowboard.theme.v1";

const demoTasks = [
  {
    id: createId(),
    title: "Polish internship resume",
    notes: "Keep it one page and link the strongest frontend work.",
    priority: "high",
    status: "todo",
    tags: ["resume", "career"],
    createdAt: Date.now() - 1000 * 60 * 60 * 6,
  },
  {
    id: createId(),
    title: "Build FlowBoard layout",
    notes: "Create responsive columns, cards, filters, and a clean mobile view.",
    priority: "medium",
    status: "progress",
    tags: ["frontend", "ui"],
    createdAt: Date.now() - 1000 * 60 * 60 * 4,
  },
  {
    id: createId(),
    title: "Write project README",
    notes: "Explain features honestly and include GitHub Pages instructions.",
    priority: "low",
    status: "done",
    tags: ["docs"],
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
  },
];

function createId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadTasks() {
  const savedTasks = localStorage.getItem(STORAGE_KEY);

  if (!savedTasks) {
    saveTasks(demoTasks);
    return demoTasks;
  }

  try {
    return JSON.parse(savedTasks);
  } catch {
    saveTasks(demoTasks);
    return demoTasks;
  }
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function resetTasks() {
  const freshDemoTasks = demoTasks.map((task) => ({
    ...task,
    id: createId(),
    createdAt: Date.now(),
  }));

  saveTasks(freshDemoTasks);
  return freshDemoTasks;
}

function loadTheme() {
  return localStorage.getItem(THEME_KEY) || "light";
}

function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}
