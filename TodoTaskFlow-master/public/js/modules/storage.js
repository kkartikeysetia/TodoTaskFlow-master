const USER_KEY = 'taskflow_user';
const TASKS_KEY = 'taskflow_tasks';

// User Management
export const saveUser = (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
};

export const clearUser = () => {
    localStorage.removeItem(USER_KEY);
};

// Task Management
export const getTasks = () => {
    const tasks = localStorage.getItem(TASKS_KEY);
    return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = (tasks) => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};