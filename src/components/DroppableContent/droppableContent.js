import React from "react";
import { Droppable } from 'react-beautiful-dnd';
import DraggableContent from "../DraggableContent/draggableContent";
import './droppableContent.scss';

const DroppableContent = (props) => {
    if (props.column.tasks[0] === null) props.column.tasks = []
    return (
        <div className="droppable-column">
            <h2>{props.column.name} {props.column.tasks.length > 0 ? props.column.tasks.length : ''}</h2>
            <Droppable droppableId={props.id}>
                {(provided, snapshot) => {
                    return (
                        <div
                            className="droppable"
                            style={{ background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey' }}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {props.column.tasks.map((task, index) => {
                                return (
                                    <DraggableContent task={task} index={index} key={task.id} />
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