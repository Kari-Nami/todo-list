import React, {useRef, useState} from 'react'
import '../css/board.css'
import {TodoCard} from "./TodoCard.jsx";

export const Board = ({ tasks, deleteFunction, updateLocation }) => {

    const boardConstraintsRef = useRef(null)

    return (
        <div className={"board"} ref={boardConstraintsRef}>
            {tasks.map((task) => (
                <TodoCard
                    key={task.id}
                    task={task}
                    deleteTask={deleteFunction}
                    constraints={boardConstraintsRef}
                    updateLocation={updateLocation}
                />
            ))}
        </div>
    )
}
