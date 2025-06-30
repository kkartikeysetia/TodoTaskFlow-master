// --- Element References ---
const elements = {
  userName: document.getElementById("user-name"),
  userAvatar: document.getElementById("user-avatar"),
  filterContainer: document.querySelector(".task-filters"),
  taskList: document.getElementById("task-list"),
  taskItemTemplate: document.getElementById("task-item-template"),
  counts: {
    todo: document.getElementById("todo-count"),
    completed: document.getElementById("completed-count"),
    archived: document.getElementById("archived-count"),
  },
  toast: {
    element: document.getElementById("toast-notification"),
    title: document.getElementById("toast-title"),
    message: document.getElementById("toast-message"),
  },
};

let toastTimeout;

/**
 * Creates an HTML element for a single task.
 * @param {object} task - The task object.
 * @returns {HTMLElement} The task item element.
 */
function createTaskElement(task) {
  const item =
    elements.taskItemTemplate.content.cloneNode(true).firstElementChild;
  item.dataset.id = task.id;
  item.querySelector(".task-title").textContent = task.title;
  item.querySelector(".task-desc").textContent = task.description || "";
  item.querySelector(
    ".task-priority"
  ).textContent = `Priority: ${task.priority}`;

  const timestamp = new Date(task.modifiedAt || task.createdAt).toLocaleString(
    "en-US",
    {
      month: "numeric",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }
  );
  item.querySelector(
    ".task-timestamp"
  ).textContent = `Last modified at:\n${timestamp}`;
  item.querySelectorAll(".task-priority")[0].textContent = "";
  item.querySelectorAll(".task-priority")[1].textContent = task.priority
    ? `Priority: ${task.priority}`
    : "";

  const actionsContainer = item.querySelector(".task-actions");
  actionsContainer.innerHTML = ""; // Clear previous actions

  if (task.status === "todo") {
    actionsContainer.innerHTML = `
            <button class="btn-action btn-complete" data-action="complete">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                Mark as completed
            </button>
            <button class="btn-action btn-archive" data-action="archive">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5z"/></svg>
                Archive
            </button>`;
  } else if (task.status === "completed") {
    actionsContainer.innerHTML = `
            <button class="btn-action btn-archive" data-action="archive">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5z"/></svg>
                Archive
            </button>`;
  } else {
    actionsContainer.innerHTML = `<span class="archived-text">Archived</span>`;
  }
  setTimeout(() => {
    item.classList.add("show");
  }, 300);

  return item;
}

/**
 * Renders the list of tasks based on the active filter.
 * @param {Array<object>} tasks - The full array of tasks.
 * @param {string} activeFilter - The current filter ('todo', 'completed', 'archived').
 */
// export function renderTaskList(tasks, activeFilter) {
//   elements.taskList.innerHTML = "";
//   const searchQuery =
//     document.getElementById("search-tasks")?.value?.toLowerCase() || "";
//   const filteredTasks = tasks.filter(
//     (task) =>
//       task.status === activeFilter &&
//       (task.title.toLowerCase().includes(searchQuery) ||
//         task.description?.toLowerCase().includes(searchQuery))
//   );

//   filteredTasks
//     .sort(
//       (a, b) =>
//         new Date(b.modifiedAt || b.createdAt) -
//         new Date(a.modifiedAt || a.createdAt)
//     )
//     .forEach((task) => {
//       const taskElement = createTaskElement(task);
//       elements.taskList.appendChild(taskElement);
//     });

//   updateCounts(tasks);
//   updateActiveFilterButton(activeFilter);
// }
export function renderTaskList(tasks, activeFilter, searchQuery = "") {
  elements.taskList.innerHTML = "";

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = task.status === activeFilter;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery) ||
      task.description?.toLowerCase().includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  filteredTasks
    .sort(
      (a, b) =>
        new Date(b.modifiedAt || b.createdAt) -
        new Date(a.modifiedAt || a.createdAt)
    )
    .forEach((task) => {
      const taskElement = createTaskElement(task);
      elements.taskList.appendChild(taskElement);
    });

  updateCounts(tasks);
  updateActiveFilterButton(activeFilter);
}

/**
 * Updates the task counts in the filter tabs.
 * @param {Array<object>} tasks - The full array of tasks.
 */
function updateCounts(tasks) {
  elements.counts.todo.textContent = tasks.filter(
    (t) => t.status === "todo"
  ).length;
  elements.counts.completed.textContent = tasks.filter(
    (t) => t.status === "completed"
  ).length;
  elements.counts.archived.textContent = tasks.filter(
    (t) => t.status === "archived"
  ).length;
}

/**
 * Updates the visual state of the filter buttons.
 * @param {string} activeFilter - The current active filter.
 */
function updateActiveFilterButton(activeFilter) {
  elements.filterContainer.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === activeFilter);
  });
}

/**
 * Updates the user profile in the header.
 * @param {object} user - The user object.
 * @param {string} avatarUrl - The URL for the user's avatar.
 */
export function updateUserProfile(user, avatarUrl) {
  elements.userName.textContent = user.name;
  elements.userAvatar.src = avatarUrl;
  elements.userAvatar.alt = `${user.name}'s Avatar`;
}

/**
 * Shows a toast notification.
 * @param {string} title - The title of the toast.
 * @param {string} message - The message body of the toast.
 */
export function showToast(title, message) {
  clearTimeout(toastTimeout);
  elements.toast.title.textContent = title;
  elements.toast.message.textContent = message;

  elements.toast.element.hidden = false;
  // Use a short timeout to allow the element to be rendered before adding the class for transition
  setTimeout(() => {
    elements.toast.element.classList.add("show");
  }, 10);

  toastTimeout = setTimeout(() => {
    elements.toast.element.classList.remove("show");
    // Hide the element after the transition ends
    setTimeout(() => (elements.toast.element.hidden = true), 500);
  }, 3000);
}
