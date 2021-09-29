import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import "./dragColumn.scss"

const backendItemsData = [
    {id: uuid(), content: 'First task'},
    {id: uuid(), content: 'Second task'},
    {id: uuid(), content: 'Third task'},
    {id: uuid(), content: 'Fourth task'},
    {id: uuid(), content: 'Fifth task'}
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
    const {source, destination} = result
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

const DragColumn = () => {
    const [columns, setColumns] = useState(backendColumnData);

    return(
        <div className="drag-column">
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([id, column]) => {
                    return (
                        <div className="droppable-column">
                            <h2>{column.name}</h2>
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
                                                                    className="draggable"
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={{
                                                                        backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                                                        ...provided.draggableProps.style
                                                                    }}
                                                                >
                                                                    {item.content}
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