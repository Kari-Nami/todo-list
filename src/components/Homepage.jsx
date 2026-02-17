import '../css/homepage.css'
import {motion} from "motion/react"
import React, {useEffect, useRef, useState} from "react";
import {Board} from "./Board.jsx";
import tasks_json from '../tasks.json'

function Homepage() {

    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('tasks')

        if (saved) { return JSON.parse(saved) }
        else { return tasks_json }
        // return tasks_json
    })

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks]);

    const boardReference = useRef(null)

    const addTask = () => {
        const taskId = Date.now()

        const task_w = 150
        const task_h = 150

        let x = 0
        let y = 0

        if (boardReference.current) {
            const boardDimensions = boardReference.current.getBoundingClientRect()

            x = (boardDimensions.width/2) - (task_w/2)
            y = (boardDimensions.height/2) - (task_h/2)

        }

        const newTask = {
            id: taskId,
            name: "task",
            x: x,
            y: y,
            w: task_w,
            h: task_h
        }

        setTasks([...tasks, newTask])
    }

    const deleteTask = (taskId) => {
        setTasks( tasks.filter((task) => task.id !== taskId) )
    }

    const updateLocation = (id, offset) => {

        setTasks(
            (oldTasks) => oldTasks.map((task) => {
                if (task.id === id) {
                    return { ...task, x: task.x + offset.x, y: task.y + offset.y }
                }
                return task
            })
        )
    }

    const resize = (id, newSize) => {
        setTasks((oldTasks) => oldTasks.map((task) => {
            if (task.id === id) {
                return { ...task, w: newSize.w, h: newSize.h }
            }
            return task
        }))
    }

    return (
        <div className={"homepage-container"}>

            {/* menu at the top */}
            <motion.div
                className={"menu-container"}
                initial={{ opacity: 0.2, y: -10 }}
                animate={{ opacity: 1,  y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <h1> To-do List </h1>
                <motion.button
                    className={"create-button"}
                    onClick={addTask}
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 1}}
                    transition={{type: "spring", stiffness: 300, damping: 20}}
                >
                    Add new task
                </motion.button>
            </motion.div>

            <div className={"board-container"}>
                <Board
                    tasks={tasks}
                    deleteFunction={deleteTask}
                    updateLocation={updateLocation}
                    boardRef={boardReference}
                    resize={resize}
                />
            </div>
        </div>
    )
}

export default Homepage
