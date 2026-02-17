import '../css/homepage.css'
import {motion} from "motion/react"
import React, {useEffect, useState} from "react";
import {Board} from "./Board.jsx";
import tasks_json from '../tasks.json'

function Homepage() {

    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('tasks')

        if (saved) { return JSON.parse(saved) }
        else { return tasks_json }
    })

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks]);

    const addTask = () => {
        const taskId = Date.now()

        const newTask = {
            id: taskId,
            name: "task"
        }

        setTasks([...tasks, newTask])
    }

    const deleteTask = (taskId) => {
        const buttonToDelete = document.querySelector(`[data-testid="${taskId}"]`)
        buttonToDelete.classList.add("deleted_item")
        setTimeout(()=>{
            setTasks( tasks.filter((task) => task.id !== taskId) )
        },3000)

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
                <Board tasks={tasks} deleteFunction={deleteTask}/>
            </div>
        </div>
    )
}

export default Homepage
