import { API_CONFIG } from './config.js';

/**
 * Fetches an avatar from the UI Avatars API.
 * @param {string} name - The name to generate an avatar for.
 * @returns {string} The URL of the generated avatar image.
 */
export function getAvatarUrl(name) {
    // A professional touch: use encodeURIComponent for safety
    const formattedName = name.replace(/\s+/g, '+');
    return `${API_CONFIG.UI_AVATARS_URL}?name=${encodeURIComponent(formattedName)}&background=6d28d9&color=fff&size=128`;
}

/**
 * Fetches initial todo data from the DummyJSON API.
 * @param {number} userId - The user ID to fetch todos for.
 * @returns {Promise<Array>} A promise that resolves to an array of tasks.
 */
export async function fetchInitialTodos(userId) {
    try {
        const response = await fetch(`${API_CONFIG.DUMMY_JSON_URL}${userId}`);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        
        // Transform API data to our app's format
        return data.todos.map(todo => ({
            id: `api-${todo.id}`, // Prefix to avoid collisions with user-created tasks
            title: todo.todo,
            description: '',
            status: todo.completed ? 'done' : 'todo',
            priority: 'medium', // Default priority
            createdAt: new Date().toISOString(),
        }));
    } catch (error) {
        console.error("Failed to fetch initial todos:", error);
        // Return empty array on failure so the app doesn't crash
        return [];
    }
}