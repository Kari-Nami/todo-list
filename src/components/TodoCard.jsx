import React from 'react'
import { motion } from "motion/react";
import '../css/todo-card.css'

export const TodoCard = ({ task, deleteTask }) => {

    const animations = {
        hidden: {scale: 1.05},
        visible: {scale: 1}
    }

    return (
        <motion.div
            className={'task'}
            key={task.id}
            variants={animations}
            initial="hidden"
            animate="visible"

            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}

            drag
            dragMomentum={false}
            dragConstraints={{top: -10, left: -100, bottom: 500, right: 100}}
            dragElastic={0}
        >
            {task.name} - {task.id}
            <button onClick={() => deleteTask(task.id)}>
                Delete
            </button>
        </motion.div>
    )
}
