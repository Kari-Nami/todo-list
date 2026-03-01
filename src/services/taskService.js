export function loadTasks() {
    return localStorage.getItem('tasks')
}

export function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


export function createTask(tasks, {x, y}) {
    const id = Date.now()
    const task_w = 150
    const task_h = 150
    const defaultColour = "#ffff00"

    const currentHighestZ = Math.max(
        0,
        ...tasks.map(task => task.z || 0)
    )

    const newTask = {
        id: id,
        name: "",
        content: "",
        colour: bgGradient(defaultColour),
        x,
        y,
        w: task_w,
        h: task_h,
        z: currentHighestZ + 1
    }

    return {tasks: [...tasks, newTask], newTaskId: id}
}

export function deleteTask(tasks, id) {
    return tasks.filter((task) => task.id !== id)
}

/**
 * Changes the stored task's `x` and `y` locations using `offset`. Calculates the new:
 * - `x` using `task.x + offset.x`
 * - `y` using `task.y + offset.y`
 *
 * Unlike other task-related functions, it actually needs the "current" task's x & y
 * to calculate the new location, so it cannot use the helper `changeOneTask`.
 */
export function moveTask(tasks, id, offset) {
    return tasks.map((task) => {
        if (task.id === id) { return {...task, x: task.x + offset.x, y: task.y + offset.y} }
        return task
    })
}

export function resizeTask(tasks, id, newDimensions) {
    return changeOneTask(tasks, id, {x: newDimensions.x, y: newDimensions.y})
}

export function updateContent(tasks, id, field, newValue) {
    return changeOneTask(tasks, id, {[field]: newValue})
}

export function changeColour(tasks, id, newColour) {
    return changeOneTask(tasks, id, {colour: bgGradient(newColour)})
}

export function bringTaskToFront(tasks, id) {
    const currentHighestZ = Math.max( 0, ...tasks.map(task => task.z || 0) )
    return changeOneTask(tasks, id, {z: currentHighestZ})
}

// ----- helpers -----

function changeOneTask(tasks, id, changes) {
    return tasks.map((task) => {
        if (task.id === id) { return {...task, ...changes} }
        return task
    })
}

function bgGradient(colour) {
    return `linear-gradient( 135deg, ${colour} calc(100% - var(--corner-size) * 0.7), transparent 0 )`
}