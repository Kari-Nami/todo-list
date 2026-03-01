import React, {useEffect, useMemo, useRef, useState} from 'react'
import { motion } from "motion/react";
import '../css/todo-card.css'

export const TodoCard = ({ task, deleteTask, constraints, updateLocation, resize, updateTaskContent, bringToFront }) => {

    const animations = {
        hidden: {scale: 1.05},
        visible: {scale: 1}
    }

    const width = task.w
    const height = task.h

    const isBackgroundDark = useMemo(() => {
        const colour = task.colour.match(/#[0-9a-fA-F]{6}/)[0]
        const luminosity = (
            parseInt(colour.slice(1, 3), 16)*0.299 +
            parseInt(colour.slice(3, 5), 16)*0.587 +
            parseInt(colour.slice(5, 7), 16)*0.114)
            / 256

        return luminosity < 0.8

    }, [task.colour])
    const fontColour = isBackgroundDark ? '#fff' : '#000'

    const taskReference = useRef(null)

    return (
        <motion.div
            ref={taskReference}
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
                background: task.colour,
                x: task.x,
                y: task.y,
                width: width,
                height: height,
                zIndex: task.z
        }}
        >
            <div className='task-content'>
                <input
                    className='task-title'
                    value={task.name || ''}
                    placeholder={'task name'}
                    style={{ color: fontColour }}

                    onChange={(e) => updateTaskContent(task.id, 'name', e.target.value)}

                    onPointerDown={(e) => e.stopPropagation()}

                />

                <textarea
                    className='task-details'
                    value={task.content || ''}
                    placeholder={'add details...'}
                    onChange={(e) => updateTaskContent(task.id, 'content', e.target.value)}
                    style={{ color: fontColour }}

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
                className='resize-corner'
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

                style={{ borderLeft: `var(--corner-size) solid rgba(0, 0, 0, 0.2)` }}
            />
        </motion.div>
    )
}