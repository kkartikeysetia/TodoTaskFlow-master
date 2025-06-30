let draggedItem = null;

function handleDragStart(e) {
    draggedItem = e.target;
    // Add a class for styling the dragged item
    setTimeout(() => e.target.classList.add('dragging'), 0);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    draggedItem = null;
}

function handleDragOver(e) {
    e.preventDefault(); // Necessary to allow dropping
    const dropzone = e.target.closest('.task-list');
    if (dropzone) {
        dropzone.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    const dropzone = e.target.closest('.task-list');
    if (dropzone) {
        dropzone.classList.remove('drag-over');
    }
}

function handleDrop(e, onTaskDrop) {
    e.preventDefault();
    const dropzone = e.target.closest('.task-list');
    if (dropzone) {
        dropzone.classList.remove('drag-over');
        if (draggedItem) {
            const taskId = draggedItem.dataset.id;
            const newStatus = dropzone.dataset.status;
            onTaskDrop(taskId, newStatus);
        }
    }
}

export function initializeDragAndDrop(onTaskDrop) {
    const taskLists = document.querySelectorAll('.task-list');
    const taskBoard = document.querySelector('.kanban-board');

    // Use event delegation for dynamically added tasks
    taskBoard.addEventListener('dragstart', handleDragStart);
    taskBoard.addEventListener('dragend', handleDragEnd);

    taskLists.forEach(list => {
        list.addEventListener('dragover', handleDragOver);
        list.addEventListener('dragleave', handleDragLeave);
        // Pass the callback to the drop handler
        list.addEventListener('drop', (e) => handleDrop(e, onTaskDrop));
    });
}