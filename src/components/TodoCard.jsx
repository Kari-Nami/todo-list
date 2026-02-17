import React from 'react'
import { motion } from "motion/react";
import '../css/todo-card.css'
import {AnimatePresence} from "motion/react"

export const TodoCard = ({ task, deleteTask, boardConstraints }) => {

    const item = {
        start: {scale: 1.05, opacity: 0},
        main: {scale: 1, opacity: 1},
        end: {scale: 0.9, opacity: 0}
    }

    return (
        <AnimatePresence>
            <motion.div
                className={'task'}
                key={task.id}
                variants={item}

                initial="start"
                animate="main"
                exit="end"
                transition={{duration: 1}}

                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ y: -10, cursor: "grabbing", zIndex: 100 }}

                drag
                dragMomentum={false}
                dragElastic={0}
                whileDrag={{ scale: 1.1, cursor: "grabbing", zIndex: 100 }}
                dragConstraints={boardConstraints}
                data-testid={`${task.id}`}

            >
                {task.name}
                <motion.button
                    className={"task-delete-button"}
                    onClick={() => deleteTask(task.id)}
                    whileTap={{scale: 1}}
                    transition={{type: "spring", stiffness: 300, damping: 20}}
                >
                    Delete
                </motion.button>
            </motion.div>
        </AnimatePresence>
    )
}
