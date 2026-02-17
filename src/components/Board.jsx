import React, {useRef, useState} from 'react'
import '../css/board.css'
import {TodoCard} from "./TodoCard.jsx";

export const Board = ({ tasks, deleteFunction }) => {

    const reference = useRef(null)

    return (
        <div className={"board"} ref={reference}>
            {/*temporary list of tasks */}
            <div className={"task-list"}>
                {tasks.map((task) => (
                    <TodoCard
                        key={task.id}
                        task={task}
                        deleteTask={deleteFunction}
                        boardConstraints={reference}
                    />
                ))}
            </div>
        </div>
    )
}
