import React, { useState } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import "./dragColumns.scss"
import DroppableContent from "../DroppableContent/droppableContent";

//how backend is sending data
const res = {
    "1": {
        "name": "TO DO",
        "tasks": [
            {
                "id": 1,
                "title": "First generated task",
                "description": "The first task created with the api",
                "priority": "low",
                "column_item_id": 1
            },
            {
                "id": 3,
                "title": "Second generated task",
                "description": "The second task created with the api",
                "priority": "medium",
                "column_item_id": 1
            }
        ]
    },
    "2": {
        "name": "IN PROGRESS",
        "tasks": [
            {
                "id": 4,
                "title": "Fifth Task",
                "description": "You will need to do X on this fifth task",
                "priority": "medium",
                "column_item_id": 2
            }
        ]
    },
    "3": {
        "name": "IN REVIEW",
        "tasks": [
            null
        ]
    },
    "4": {
        "name": "COMPLETED",
        "tasks": [
            null
        ]
    }
}

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
        tasks: backendItemsData
    },
    [uuid()]: {
        name: 'Todo',
        tasks: []
    },
    [uuid()]: {
        name: 'In Progress',
        tasks: []
    },
    [uuid()]: {
        name: 'Complete',
        tasks: []
    }
}

const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return
    const { source, destination } = result
    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId]
        const destColumn = columns[destination.droppableId]
        const sourceTasks = [...sourceColumn.tasks]
        const destTasks = [...destColumn.tasks]
        const [removed] = sourceTasks.splice(source.index, 1)
        destTasks.splice(destination.index, 0, removed)
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                tasks: sourceTasks
            },
            [destination.droppableId]: {
                ...destColumn,
                tasks: destTasks
            }
        })
    } else {
        const { source, destination } = result
        const column = columns[source.droppableId]
        const copiedTasks = [...column.tasks]
        const [removed] = copiedTasks.splice(source.index, 1)
        copiedTasks.splice(destination.index, 0, removed)
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                tasks: copiedTasks
            }
        })
    }
}

const DragColumns = () => {
    const [columns, setColumns] = useState(backendColumnData);

    return (
        <div className="drag-column">
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([id, column]) => {
                    return (
                        <DroppableContent id={id} column={column} key={id} />
                    )
                })}
            </DragDropContext>
        </div>
    )
}

export default DragColumns;