import React, { useState } from "react";
import { Draggable } from 'react-beautiful-dnd';
import './draggableContent.scss'

import ReadTaskModal from "../Modals/ReadTaskModal/readTaskModal";
import useModal from "../Modals/utilities/useModal";

const DraggableContent = (props) => {
    const [modalData] = useState(props.task)
    const { isShowing, toggle } = useModal()

    const prioritySwitch = priority => {
        switch (priority) {
            case 'high': return 'draggable priority-high';
            case 'medium': return 'draggable priority-medium';
            case 'low': return 'draggable priority-low';
            default: return 'draggable'
        }
    }

    return (
        <div>
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
                            onClick={() => toggle()}
                        >
                            <div className="draggable-header">
                                {props.task.title}
                            </div>
                            <div className="draggable-desc">
                                {props.task.description.length >= 70 ? props.task.description.substring(0, 70) + '...' : props.task.description}
                            </div>
                        </div>
                    )
                }}
            </Draggable>
            <ReadTaskModal isShowing={isShowing} hide={toggle} data={modalData} triggerParentUpdate={props.triggerParentUpdate} />
        </div>
    )
}

export default DraggableContent