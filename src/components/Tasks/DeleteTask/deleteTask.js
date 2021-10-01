import React from "react";
import "./deleteTask.scss";
import axios from 'axios';

const DeleteTask = () => {

    const handleDeleteTask = () => {
        console.log('Delete task button clicked')
    }

    return (
        <div className="delete-btn" onClick={handleDeleteTask}>
            Delete task (this btn will be put in task modal)
        </div>
    )
}

export default DeleteTask;