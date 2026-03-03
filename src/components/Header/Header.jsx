import React from 'react'
import {motion} from "motion/react"

export const Header = ( props ) => {
    return (
        <motion.div
            className={"header-container"}
            initial={{ opacity: 0.2, y: -10 }}
            animate={{ opacity: 1,  y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className={"detail-container"}>
                <h1> To-do List </h1>
                <p style={{marginBottom: "0.5rem"}}> Open tasks: {props.tasks ? props.tasks.length : 0} </p>
                <motion.button
                    className={"create-button"}
                    onClick={props.handleAddTask}
                    whileHover={{scale: 1.05}}
                    whileTap={{scale: 1}}
                    transition={{type: "spring", stiffness: 300, damping: 20}}
                >
                    Add new task
                </motion.button>
            </div>

            {/* colour picker */}
            {props.focusTaskId && (
                <div className={'task-customization'} onPointerDown={(e) => e.stopPropagation()}>
                    <p style={{ fontWeight: 600, margin: "-0.2rem 0 0.2rem 0" }} >Task Customization</p>
                    <div className={'colour-palette'} style={{ '--palette-columns': 5 }}>
                        {props.colours.map((colour, index) =>
                            <motion.button
                                key={index}
                                className={`colour-choice ${colour === props.focusTask.backgroundColour ? 'colour-current' : ''}`}
                                onClick={() => props.changeTaskColour(props.focusTaskId, colour)}
                                style={colour !== props.focusTask.backgroundColour ?
                                    { background: colour, border: "none" } :
                                    { background: '#fff', border: `${colour} solid 5px` }
                                }

                                whileHover={colour !== props.focusTask.backgroundColour ?
                                    {scale: 1.1, border: "#fff solid 2px" } :
                                    {scale: 1.1, border: `${colour} solid 5px` }
                                }
                                transition={{type: "spring", stiffness: 300, damping: 20, duration: 1,
                                    border: {duration: 0}, }
                                }
                            />
                        )}
                    </div>
                    <input
                        className={'colour-picker'}
                        type={'color'}
                        value={props.focusTask.backgroundColour}
                        onChange={(e) => props.changeTaskColour(props.focusTaskId, e.target.value)}
                        onPointerDown={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </motion.div>
    )
}
