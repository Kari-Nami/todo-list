import React, {useState} from 'react'
import '../css/board.css'
import {TodoCard} from "./TodoCard.jsx";

export const Board = ({ tasks, deleteFunction }) => {

    return (
        <div className={"board"}>
            {tasks.map((task) => (
                <TodoCard task={task} deleteTask={deleteFunction}/>
            ))}
        </div>
    )
}
