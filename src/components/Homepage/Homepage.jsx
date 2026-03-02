import './homepage.css'
import {motion} from "motion/react"
import React, {useRef} from "react";
import {Board} from "../Board/Board.jsx";
import {useTasks} from "../../hooks/useTasks.js";
import {useColours} from "../../hooks/useColours.js";

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
            <motion.div
                className={"menu-container"}
                initial={{ opacity: 0.2, y: -10 }}
                animate={{ opacity: 1,  y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        margin: "0 1rem",
                        alignItems: "center"
                    }}
                >
                    <h1> To-do List </h1>
                    <p style={{marginBottom: "0.5rem"}}> Open tasks: {tasks? tasks.length : 0} </p>
                    <motion.button
                        className={"create-button"}
                        onClick={handleAddTask}
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 1}}
                        transition={{type: "spring", stiffness: 300, damping: 20}}
                    >
                        Add new task
                    </motion.button>
                </div>

                {/* colour picker */}
                {focusTaskId && (
                    <div className={'task-customization'} onPointerDown={(e) => e.stopPropagation()}>
                        <div className={'colour-palette'}>
                            {colours.map((colour, index) =>
                                <button
                                    key={index}
                                    className={'colour-choice'}
                                    onClick={() => changeTaskColour(focusTaskId, colour)}
                                    style={{background: colour}}
                                />
                            )}
                        </div>
                        <input
                            className={'colour-picker'}
                            type={'color'}
                            value={focusTask.colour.split(" ")[2]}
                            onChange={(e) => changeTaskColour(focusTaskId, e.target.value)}
                            onPointerDown={(e) => e.stopPropagation()}
                        />
                    </div>
                )}
            </motion.div>

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
