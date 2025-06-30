import { getUser, clearUser, getTasks, saveTasks } from "./modules/storage.js";
import { getAvatarUrl, fetchInitialTodos } from "./modules/api.js";
import * as UI from "./modules/ui.js";
import { INITIAL_USER_ID } from "./modules/config.js";

// --- State Management ---
const state = {
  tasks: [],
  user: null,
  activeFilter: "todo", // Default filter
  searchQuery: "", // For search functionality
};

// --- Core Logic ---
// In app.js, find and replace this function

function addTask(title, description, priority) {
  if (!title) return;

  const newTask = {
    id: `task-${Date.now()}`,
    title: title,
    description: description,
    priority: priority,
    status: "todo",
    createdAt: new Date().toISOString(),
    modifiedAt: new Date().toISOString(),
  };

  state.tasks.unshift(newTask);
  saveTasks(state.tasks);
  UI.renderTaskList(state.tasks, state.activeFilter, state.searchQuery);
}

function updateTaskStatus(taskId, newStatus) {
  const task = state.tasks.find((t) => t.id === taskId);
  if (task) {
    task.status = newStatus;
    task.modifiedAt = new Date().toISOString();
    saveTasks(state.tasks);
    UI.renderTaskList(state.tasks, state.activeFilter);
    UI.showToast(
      "Task Updated",
      `Task moved to ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}.`
    );
  }
}

// --- Event Handlers ---

// In app.js, find and replace this function

function handleAddTaskSubmit(event) {
  event.preventDefault();
  console.log("Form Submitted");
  const titleInput = document.getElementById("new-task-title");
  const descInput = document.getElementById("new-task-desc");
  const prioritySelect = document.getElementById("new-task-priority"); // Get priority select

  const title = titleInput.value.trim();
  const description = descInput.value.trim();
  const priority = prioritySelect.value; // Get priority value

  addTask(title, description, priority);

  // This part stays the same
  titleInput.value = "";
  descInput.value = "";
  prioritySelect.value = "medium"; // Reset priority to medium
  titleInput.focus(); // Set focus back to title for quick adding
}
function handleFilterClick(event) {
  const filterBtn = event.target.closest(".filter-btn");
  if (filterBtn) {
    state.activeFilter = filterBtn.dataset.filter;
    UI.renderTaskList(state.tasks, state.activeFilter, state.searchQuery);
  }
}

function handleTaskListClick(event) {
  const actionBtn = event.target.closest(".btn-action");
  if (actionBtn) {
    const taskId = actionBtn.closest(".task-item").dataset.id;
    const action = actionBtn.dataset.action;

    if (action === "complete") {
      updateTaskStatus(taskId, "completed");
    } else if (action === "archive") {
      updateTaskStatus(taskId, "archived");
    }
  }
}

function handleSignOut() {
  clearUser();
  window.location.href = "/index.html";
}
function handleSearchInput(event) {
  state.searchQuery = event.target.value.toLowerCase();
  UI.renderTaskList(state.tasks, state.activeFilter, state.searchQuery);
}

// --- Initialization ---

async function initializeApp() {
  // 1. Authenticate User
  state.user = getUser();
  if (!state.user) {
    window.location.href = "/index.html";
    return;
  }

  // 2. Setup UI Header
  const avatarUrl = getAvatarUrl(state.user.name);
  UI.updateUserProfile(state.user, avatarUrl);

  // 3. Load Tasks from storage or API
  state.tasks = getTasks();
  if (state.tasks.length === 0) {
    console.log("No local tasks found. Fetching initial tasks...");
    const apiTasks = await fetchInitialTodos(INITIAL_USER_ID);
    // Add modifiedAt property to API tasks
    state.tasks = apiTasks.map((task) => ({
      ...task,
      modifiedAt: new Date().toISOString(),
    }));
    saveTasks(state.tasks);
  }

  // 4. Initial Render
  UI.renderTaskList(state.tasks, state.activeFilter);

  // 5. Setup Event Listeners
  const form = document.getElementById("add-task-form");
  if (!form) {
    console.error("Form not found in DOM! Is it loaded?");
  } else {
    console.log("Form found. Attaching submit listener.");
    form.addEventListener("submit", handleAddTaskSubmit);
  }
  document
    .querySelector(".task-filters")
    .addEventListener("click", handleFilterClick);
  document
    .getElementById("task-list")
    .addEventListener("click", handleTaskListClick);
  document
    .getElementById("sign-out-btn")
    .addEventListener("click", handleSignOut);
}
document
  .getElementById("search-tasks")
  .addEventListener("input", handleSearchInput);

// Start the application
document.addEventListener("DOMContentLoaded", initializeApp);
