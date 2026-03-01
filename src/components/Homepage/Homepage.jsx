import './homepage.css'
import {motion} from "motion/react"
import React, {useRef} from "react";
import {Board} from "../Board/Board.jsx";
import {useTasks} from "../../hooks/useTasks.js";

function Homepage() {

    const colours = [
        "#ffa8a8", "#ffcfa8", "#fff5a8", "#a8ffb0",
        "#a8fff9", "#a8c1ff", "#d9a8ff", "#ffabe1",
        "#ff3333", "#ff8f33", "#ffdd33", "#33ff3d",
        "#33fff5", "#3385ff", "#8f33ff", "#ff33e1",
        "#7d0d0d", "#7d470d", "#7d6f0d", "#3d7d0d",
        "#0d7d7d", "#0d477d", "#470d7d", "#7d0d47",
        "#ffffff", "#a8a8a8", "#7e7e7e", "#545454",
        "#2a2a2a", "#000000", "#5c3c29", "#3e2819"
    ]

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

    const handleAddTask = () => {
        const task_w = 150
        const task_h = 150
        let x = 0
        let y = 0

        if (boardReference.current) {
            const rect = boardReference.current.getBoundingClientRect()
            x = (rect.width / 2) - (task_w / 2)
            y = (rect.height / 2) - (task_h / 2)
        }

        addTask({ x, y })
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

                {focusTaskId && (
                    <div className={'task-customization'} onPointerDown={(e) => e.stopPropagation()}>
                        <div className={'colour-palette'}>
                            {colours.map((colour) =>
                                <button
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
                />
            </div>
        </div>
    )
}

export default Homepage
