import {useEffect, useState} from "react";
import * as taskService from '../services/taskService.js'

export function useTasks() {
    const [tasks, setTasks] = useState(() => taskService.loadTasks())
    const [focusTaskId, setFocusTaskId] = useState(null)

    const focusTask = focusTaskId? (tasks.find((task) => task.id === focusTaskId)) : null

    useEffect(() => {
        taskService.saveTasks(tasks)
    }, [tasks]);

    const addTask = (location) => {
        const result = taskService.createTask(tasks, location)

        setTasks(result.tasks)
        setFocusTaskId(result.newTaskId)
    }

    const deleteTask = (id) => {
        setTasks(taskService.deleteTask(tasks, id))
        if (focusTaskId === id) setFocusTaskId(null)
    }

    const updateTaskLocation = (id, offset) => {
        setTasks(taskService.moveTask(tasks, id, offset))
    }

    const resizeTask = (id, newSize) => {
        setTasks(taskService.resizeTask(tasks, id, newSize))
    }

    const updateTaskContent = (id, field, newValue) => {
        setTasks(taskService.updateContent(tasks, id, field, newValue))
    }

    const changeTaskColour = (id, newColour) => {
        setTasks(taskService.changeColour(tasks, id, newColour))
    }

    const bringTaskToFront = (id) => {
        setTasks(taskService.bringTaskToFront(tasks, id))
        setFocusTaskId(id)
    }

    return {
        tasks,
        focusTaskId, setFocusTaskId,
        focusTask,
        addTask,
        deleteTask,
        updateTaskLocation,
        resizeTask,
        updateTaskContent,
        changeTaskColour,
        bringTaskToFront
    }
}