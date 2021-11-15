import React, { useState, useEffect } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import "./dragColumns.scss"
import DroppableContent from "../DroppableContent/droppableContent";
import axios from 'axios';
import CreateTaskModal from "../Modals/CreateTaskModal/createTaskModal";
import useModal from "../Modals/utilities/useModal";
import ThemeButton from "../ThemeButton/theme-button";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const { isShowing, toggle } = useModal()

    const fetchData = async (taskStatus, taskTitle) => {
        try {
            const databaseData = await axios.get(process.env.REACT_APP_API_URL)
            const backendColumnData = databaseData.data[0].res
            setColumns(backendColumnData)
            if (taskStatus && taskTitle) {
                var toastTitle
                if (taskStatus === 'create') toastTitle = `New task created: ${taskTitle}`
                if (taskStatus === 'update') toastTitle = `Updated task: ${taskTitle}`
                if (taskStatus === 'delete') toastTitle = `Deleted task: ${taskTitle}`
                toast.success(toastTitle, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (err) {
            console.error(err)
            setServerErrorMessage('Error getting task data from back end (SERVER ERROR)')
            setColumns({ "1": { "name": "TO DO", "tasks": [] }, "2": { "name": "IN PROGRESS", "tasks": [] }, "3": { "name": "IN REVIEW", "tasks": [] }, "4": { "name": "COMPLETED", "tasks": [] } })
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="dnd-overlay">
            {serverErrorMessage && (
                <div className="server-error-text">
                    {serverErrorMessage}
                </div>
            )}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                theme='dark'
            />
            <div className="create-and-dark-btns">
                <div className="create-btn" onClick={() => toggle()}>
                    Create new task
                </div>
                <ThemeButton />
            </div>
            <CreateTaskModal isShowing={isShowing} hide={toggle} triggerParentUpdate={fetchData} />
            <div className="error-and-content">
                <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns).map(([id, column]) => {
                        return (
                            <DroppableContent id={id} column={column} key={id} triggerParentUpdate={fetchData} />
                        )
                    })}
                </DragDropContext>
            </div>
        </div>
    )
}

export default DragColumns;