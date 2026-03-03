import React, {useRef, useState} from 'react'
import './board.css'
import {TodoCard} from "../TodoCard/TodoCard.jsx";

export const Board = ( props ) => {

    return (
        <div className={"board"} ref={props.boardRef}>
            {props.tasks.map((task) => (
                <TodoCard
                    key={task.id}
                    task={task}
                    deleteTask={props.deleteFunction}
                    constraints={props.boardRef}
                    updateLocation={props.updateLocation}
                    resize={props.resize}
                    updateTaskContent={props.updateTaskContent}
                    bringToFront={props.bringToFront}
                    focusTaskId={props.focusTaskId}
                    changeFieldFontColour={props.changeFieldFontColour}
                    focusTextField={props.focusTextField}
                    setFocusTextField={props.setFocusTextField}
                />
            ))}
        </div>
    )
}
