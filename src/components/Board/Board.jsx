import React, {useRef, useState} from 'react'
import './board.css'
import {TodoCard} from "../TodoCard/TodoCard.jsx";

export const Board = ({ tasks, deleteFunction, updateLocation, boardRef, resize, updateTaskContent, bringToFront }) => {

    return (
        <div className={"board"} ref={boardRef}>
            {tasks && tasks.map((task) => (
                <TodoCard
                    key={task.id}
                    task={task}
                    deleteTask={deleteFunction}
                    constraints={boardRef}
                    updateLocation={updateLocation}
                    resize={resize}
                    updateTaskContent={updateTaskContent}
                    bringToFront={bringToFront}
                />
            ))}
        </div>
    )
}
