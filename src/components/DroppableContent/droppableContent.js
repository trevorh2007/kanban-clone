import React, { useContext } from "react";
import { Droppable } from 'react-beautiful-dnd';
import DraggableContent from "../DraggableContent/draggableContent";
import './droppableContent.scss';
import { ThemeContext } from "../../utilities/ThemeContext";

const DroppableContent = (props) => {
    if (props.column.tasks[0] === null) props.column.tasks = []
    const theme = useContext(ThemeContext)
    const darkMode = theme.state.darkMode
    return (
        <div className="droppable-column">
            <h2 className={`${darkMode ? "h2-dark" : "h2-light"}`}>{props.column.name} {props.column.tasks.length > 0 ? props.column.tasks.length : ''}</h2>
            <Droppable droppableId={props.id}>
                {(provided, snapshot) => {
                    return (
                        <div
                            className="droppable"
                            style={
                                { background: snapshot.isDraggingOver ? darkMode ? '#666' : 'lightblue' : darkMode ? '#444' : 'lightgrey' }
                            }
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {props.column.tasks.map((task, index) => {
                                return (
                                    <DraggableContent task={task} index={index} key={task.id} triggerParentUpdate={props.triggerParentUpdate} />
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>
        </div>
    )
}

export default DroppableContent