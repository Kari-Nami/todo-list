import '../css/homepage.css'
import {motion} from "motion/react"
import React from "react";
import {useState} from "react";
import {TodoCard} from "./TodoCard.jsx";
import {Board} from "./Board.jsx";

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
                <Board/>
            </div>

            {/* temporary list of tasks */}
            {/*<ul className={"task-list"}>*/}
            {/*    {tasks.map((task) => (*/}
            {/*        < TodoCard task={task}/>*/}
            {/*    ))}*/}
            {/*</ul>*/}
        </div>
    )
}

export default Homepage
