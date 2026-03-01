import React, {useEffect, useMemo, useRef, useState} from 'react'
import { motion } from "motion/react";
import './todo-card.css'

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

        return luminosity < 0.75

    }, [task.colour])

    const fontColour = isBackgroundDark ? '#fff' : '#000'

    const backgroundHex = task.colour.match(/#[0-9a-fA-F]{6}/)[0]
    const r = parseInt(backgroundHex.slice(1, 3), 16)
    const g = parseInt(backgroundHex.slice(3, 5), 16)
    const b = parseInt(backgroundHex.slice(5, 7), 16)

    const taskReference = useRef(null)

    return (
        <motion.div
            ref={taskReference}
            className={'task'}
            key={task.id}
            variants={animations}
            initial="hidden"
            animate="visible"

            whileHover={{ cursor: "grab",zIndex: 100000, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20,
                zIndex: {delay: 0.5}, scale: {duration: 0.3}
            }}

            drag
            dragMomentum={false}
            dragConstraints={constraints}
            dragElastic={0}
            onDragEnd={(event, info) => {
                updateLocation(task.id, info.offset)
            }}
            whileTap={{cursor: "grabbing",  }}
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
                zIndex: task.z,

                '--bg-r': r, '--bg-g': g, '--bg-b': b,
                '--font-colour': fontColour,
        }}
        >
            <div className='task-content'>
                <input
                    className='task-title'
                    value={task.name || ''}
                    placeholder={'task name'}
                    onChange={(e) => updateTaskContent(task.id, 'name', e.target.value)}
                />

                <textarea
                    className='task-details'
                    value={task.content || ''}
                    placeholder={'add details...'}
                    onChange={(e) => updateTaskContent(task.id, 'content', e.target.value)}

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