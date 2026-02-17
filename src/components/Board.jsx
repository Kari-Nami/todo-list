import React, {useRef, useState} from 'react'
import '../css/board.css'
import {TodoCard} from "./TodoCard.jsx";

export const Board = ({ tasks, deleteFunction, updateLocation, boardRef }) => {

    return (
        <div className={"board"} ref={boardRef}>
            {tasks.map((task) => (
                <TodoCard
                    key={task.id}
                    task={task}
                    deleteTask={deleteFunction}
                    constraints={boardRef}
                    updateLocation={updateLocation}
                />
            ))}
        </div>
    )
}
