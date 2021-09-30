import React from "react";
import { Droppable } from 'react-beautiful-dnd';
import DraggableContent from "../DraggableContent/draggableContent";
import './droppableContent.scss';

const DroppableContent = (props) => {
    return (
        <div className="droppable-column">
            <h2>{props.column.name} {props.column.items.length > 0 ? props.column.items.length : ''}</h2>
            <Droppable droppableId={props.id} key={props.id}>
                {(provided, snapshot) => {
                    return (
                        <div
                            className="droppable"
                            style={{ background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey' }}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {props.column.items.map((item, index) => {
                                return (
                                    <DraggableContent item={item} index={index} key={item.id} />
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