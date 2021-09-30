import React from "react";
import { Draggable } from 'react-beautiful-dnd';
import './draggableContent.scss'

const DraggableContent = (props) => {

    const prioritySwitch = priority => {
        switch (priority) {
            case 'high': return 'draggable priority-high';
            case 'medium': return 'draggable priority-medium';
            case 'low': return 'draggable priority-low';
            default: return 'draggable'
        }
    }

    return (
        <Draggable key={props.item.id} draggableId={props.item.id} index={props.index}>
            {(provided, snapshot) => {
                return (
                    <div
                        className={prioritySwitch(props.item.priority)}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                            ...provided.draggableProps.style
                        }}
                    >
                        <div className="draggable-header">
                            {props.item.title}
                        </div>
                        <div className="draggable-desc">
                            {props.item.description}
                        </div>
                    </div>
                )
            }}
        </Draggable>
    )
}

export default DraggableContent