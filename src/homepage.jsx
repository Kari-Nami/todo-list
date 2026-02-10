import './homepage.css'
import {motion} from "motion/react"
import React from "react";
import {useState} from "react";
import {TodoCard} from "./TodoCard.jsx";

const container = {
    hidden: {opacity: 0},
    visible: {opacity: 1, transition: {staggerChildren: 0.1}}
}

function Homepage() {

    const [tasks, setTasks] = useState([])

    const addTask = () => {
        const taskId = Date.now()

        const newTask = {
            id: taskId,
            name: "task"
        }

        setTasks([...tasks, newTask])
    }

    return (
        <div className={"homepage-container"}>
            <h1> To-do List </h1>
            <motion.button className={"create-button"}
                onClick={addTask}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                Add new task
            </motion.button>

            <motion.ul
                className={"task-list"}
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {tasks.map((task) => (
                    < TodoCard task={task} />
                ))}
            </motion.ul>
        </div>
    )
}

export default Homepage
