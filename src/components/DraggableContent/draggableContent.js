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

    const showTaskInfo = (task) => {
        //add either a modal that pops up with task info, or create sliding side-bar with the info
        console.log('testing click', task)
    }

    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {(provided, snapshot) => {
                return (
                    <div
                        className={prioritySwitch(props.task.priority)}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                            backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                            ...provided.draggableProps.style
                        }}
                        onClick={() => showTaskInfo(props.task)}
                    >
                        <div className="draggable-header">
                            {props.task.title}
                        </div>
                        <div className="draggable-desc">
                            {props.task.description.substring(0, 70) + '...'}
                        </div>
                    </div>
                )
            }}
        </Draggable>
    )
}

export default DraggableContent