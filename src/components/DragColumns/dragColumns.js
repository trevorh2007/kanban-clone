import React, { useState, useEffect } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import "./dragColumns.scss"
import DroppableContent from "../DroppableContent/droppableContent";
import axios from 'axios';

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
    const [columns, setColumns] = useState({});

    useEffect(async () => {
        try {
            const databaseData = await axios.get("http://127.0.0.1:5000/api/tasks")
            const backendColumnData = databaseData.data[0].res
            setColumns(backendColumnData)
        } catch (err) {
            console.log(err)
        }
    }, [])

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