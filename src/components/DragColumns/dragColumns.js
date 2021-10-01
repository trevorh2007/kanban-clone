import React, { useState, useEffect } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import "./dragColumns.scss"
import DroppableContent from "../DroppableContent/droppableContent";
import axios from 'axios';
import CreateTask from "../Tasks/CreateTask/createTask"

const onDragEnd = async (result, columns, setColumns) => {
    if (!result.destination) return
    const { source, destination } = result
    if (source.droppableId !== destination.droppableId) {
        try {
            await axios.put(process.env.REACT_APP_API_URL + '/' + result.draggableId, { column_id: result.destination.droppableId })
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
        } catch (err) {
            console.error(err)
        }
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
    const [serverErrorMessage, setServerErrorMessage] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const databaseData = await axios.get(process.env.REACT_APP_API_URL)
                const backendColumnData = databaseData.data[0].res
                setColumns(backendColumnData)
            } catch (err) {
                console.log(err)
                setServerErrorMessage('Error getting task data from back end (SERVER ERROR)')
                setColumns({ "1": { "name": "TO DO", "tasks": [] }, "2": { "name": "IN PROGRESS", "tasks": [] }, "3": { "name": "IN REVIEW", "tasks": [] }, "4": { "name": "COMPLETED", "tasks": [] } })
            }
        }
        fetchData()
    }, [])

    return (
        <div className="dnd-overlay">
            {serverErrorMessage && (
                <div className="server-error-text">
                    {serverErrorMessage}
                </div>
            )}
            <div className="error-and-content">
                <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns).map(([id, column]) => {
                        return (
                            <DroppableContent id={id} column={column} key={id} />
                        )
                    })}
                </DragDropContext>
            </div>
            <CreateTask />
        </div>
    )
}

export default DragColumns;