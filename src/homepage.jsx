import './homepage.css'
import {motion} from "motion/react"
import React from "react";
import {useState} from "react";

const container = {
    hidden: {opacity: 0},
    visible: {opacity: 1, transition: {staggerChildren: 1}}
}

const item = {
    hidden: {opacity: 0, y: -10},
    visible: {opacity: 1, y: 0}
}

function Homepage() {

    const tasks = [1, 2]
    const [tasks2, setTasks] = useState((tasks2) => ([1, 2]))

    return (
        <div className={"homepage-container"}>
            <h1> To-do List </h1>
            <motion.button className={"create-button"}
                onClick={() => (
                    setTasks([...tasks2, 0])
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
                Add new task
            </motion.button>

            <motion.ul className={"task-list"} variants={container} initial="hidden" animate="visible">
                {tasks2.map((task) => (
                    <motion.div className={'task'} key={task} variants={item}>
                        {task}
                    </motion.div>
                ))}
            </motion.ul>
        </div>
    )
}

export default Homepage
