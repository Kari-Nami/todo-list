import React, {useState} from 'react'
import '../css/board.css'
import {TodoCard} from "./TodoCard.jsx";

export const Board = () => {

    const [tasks, setTasks] = useState([])

    return (
        <div className={"board"}>
             {/*temporary list of tasks */}
            <ul className={"task-list"}>
                {tasks.map((task) => (
                    < TodoCard task={task}/>
                ))}
            </ul>
        </div>
    )
}
