import './homepage.css'
import '../Header/header.css'
import React, {useRef} from "react";
import {Board} from "../Board/Board.jsx";
import {useTasks} from "../../hooks/useTasks.js";
import {useColours} from "../../hooks/useColours.js";
import {Header} from "../Header/Header.jsx";

function Homepage() {

    const boardReference = useRef(null)

    const {
        tasks,
        focusTaskId, setFocusTaskId,
        focusTask,
        addTask,
        deleteTask,
        updateTaskLocation,
        resizeTask,
        updateTaskContent,
        changeTaskColour,
        bringTaskToFront
    } = useTasks()

    const {colours, addColour, deleteColour} = useColours()

    const handleAddTask = () => {
        const task_w = 150
        const task_h = 150
        const defaultColour = colours[10]
        let x = 0
        let y = 0

        if (boardReference.current) {
            const rect = boardReference.current.getBoundingClientRect()
            x = (rect.width / 2) - (task_w / 2)
            y = (rect.height / 2) - (task_h / 2)
        }

        addTask({ x, y }, defaultColour)
    }

    return (
        <div className={"homepage-container"} onPointerDown={() => setFocusTaskId(null)}>

            {/* menu at the top */}
            <Header
                tasks={tasks}
                handleAddTask={handleAddTask}
                colours={colours}
                changeTaskColour={changeTaskColour}
                focusTaskId={focusTaskId}
                focusTask={focusTask}
            />

            <div className={"board-container"}>
                <Board
                    tasks={tasks}
                    deleteFunction={deleteTask}
                    updateLocation={updateTaskLocation}
                    boardRef={boardReference}
                    resize={resizeTask}
                    updateTaskContent={updateTaskContent}
                    bringToFront={bringTaskToFront}
                    focusTaskId={focusTaskId}
                />
            </div>
        </div>
    )
}

export default Homepage
