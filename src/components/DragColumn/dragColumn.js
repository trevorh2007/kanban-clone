import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import "./dragColumn.scss"

const backendItemsData = [
    { id: uuid(), title: 'First task', description: 'Task 1 description', priority: 'high' },
    { id: uuid(), title: 'Second task', description: 'Task 2 description', priority: 'high' },
    { id: uuid(), title: 'Third task', description: 'Task 3 description', priority: 'low' },
    { id: uuid(), title: 'Fourth task', description: 'Task 4 description', priority: 'medium' },
    { id: uuid(), title: 'Fifth task', description: 'Task 5 description', priority: 'medium' }
]
const backendColumnData = {
    [uuid()]: {
        name: 'Backlog',
        items: backendItemsData
    },
    [uuid()]: {
        name: 'Todo',
        items: []
    },
    [uuid()]: {
        name: 'In Progress',
        items: []
    },
    [uuid()]: {
        name: 'Complete',
        items: []
    }
}

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return
    const { source, destination } = result
    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId]
        const destColumn = columns[destination.droppableId]
        const sourceItems = [...sourceColumn.items]
        const destItems = [...destColumn.items]
        const [removed] = sourceItems.splice(source.index, 1)
        destItems.splice(destination.index, 0, removed)
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        })
    } else {
        const { source, destination } = result
        const column = columns[source.droppableId]
        const copiedItems = [...column.items]
        const [removed] = copiedItems.splice(source.index, 1)
        copiedItems.splice(destination.index, 0, removed)
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        })
    }
}

const prioritySwitch = priority => {
    switch (priority) {
        case 'high':
            return 'draggable priority-high';
            break;
        case 'medium':
            return 'draggable priority-medium';
            break;
        case 'low':
            return 'draggable priority-low';
            break;
        default:
            return 'draggable'
    }
}

const DragColumn = () => {
    const [columns, setColumns] = useState(backendColumnData);

    return (
        <div className="drag-column">
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([id, column]) => {
                    return (
                        <div className="droppable-column">
                            <h2>{column.name} {column.items.length > 0 ? column.items.length : ''}</h2>
                            <Droppable droppableId={id} key={id}>
                                {(provided, snapshot) => {
                                    return (
                                        <div
                                            className="droppable"
                                            style={{ background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey' }}
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {column.items.map((item, index) => {
                                                return (
                                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                                        {(provided, snapshot) => {
                                                            return (
                                                                <div
                                                                    className={prioritySwitch(item.priority)}
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={{
                                                                        backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                                                        ...provided.draggableProps.style
                                                                    }}
                                                                >
                                                                    <div className="draggable-header">
                                                                        {item.title}
                                                                    </div>
                                                                    <div className="draggable-desc">
                                                                        {item.description}
                                                                    </div>
                                                                </div>
                                                            )
                                                        }}
                                                    </Draggable>
                                                )
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )
                                }}
                            </Droppable>
                        </div>
                    )
                })}
            </DragDropContext>
        </div>
    )
}

export default DragColumn;