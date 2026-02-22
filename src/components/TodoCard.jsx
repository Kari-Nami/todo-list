import React, {useState} from 'react'
import { motion } from "motion/react";
import '../css/todo-card.css'

export const TodoCard = ({ task, deleteTask, constraints, updateLocation, resize, updateTaskContent, bringToFront }) => {

    const animations = {
        hidden: {scale: 1.05},
        visible: {scale: 1}
    }

    const width = task.w
    const height = task.h

    return (
        <motion.div
            className={'task'}
            key={task.id}
            variants={animations}
            initial="hidden"
            animate="visible"

            whileHover={{ cursor: "grab" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}

            drag
            dragMomentum={false}
            dragConstraints={constraints}
            dragElastic={0}
            onDragEnd={(event, info) => {
                updateLocation(task.id, info.offset)
            }}
            whileTap={{cursor: "grabbing", scale: 1.05, }}
            onPointerDown={(e) => {
                e.stopPropagation()
                bringToFront(task.id)
            }}

            style={{
                x: task.x,
                y: task.y,
                width: width,
                height: height
        }}
        >
            <div className='task-content'>
                <input
                    className='task-title'
                    value={task.name || ''}
                    placeholder={'task name'}
                    onChange={(e) => updateTaskContent(task.id, 'name', e.target.value)}

                    onPointerDown={(e) => e.stopPropagation()}
                />

                <textarea
                    className='task-details'
                    value={task.content || ''}
                    placeholder={'add details...'}
                    onChange={(e) => updateTaskContent(task.id, 'content', e.target.value)}

                    onPointerDown={(e) => e.stopPropagation()}
                />

                <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => deleteTask(task.id)}
                >
                    Delete
                </button>
            </div>
            <motion.div
                className='resize-handle'
                drag
                dragMomentum={false}
                dragElastic={0}
                dragConstraints={{top: 0, left: 0, right: 0, bottom: 0}}

                onPointerDown={(e) => e.stopPropagation()}

                onDrag={(event, info) => {
                    const new_w = width + info.delta.x
                    const new_h = height + info.delta.y

                    resize(task.id, {w: new_w, h: new_h})
                }}
            />
        </motion.div>
    )
}
