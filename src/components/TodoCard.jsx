import React from 'react'
import { motion } from "motion/react";
import '../css/todo-card.css'

export const TodoCard = ({ task, deleteTask }) => {

    const item = {
        hidden: {scale: 1.05},
        visible: {scale: 1}
    }

    return (
        <motion.div
            className={'task'}
            key={task.id}
            variants={item}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            layout
        >
            {task.name}
            <button onClick={() => deleteTask(task.id)}>
                Delete
            </button>
        </motion.div>
    )
}
