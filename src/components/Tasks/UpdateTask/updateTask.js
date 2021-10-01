import React from "react";
import "./updateTask.scss";
import axios from 'axios';

const UpdateTask = () => {

    const handleUpdateTask = () => {
        console.log('Update task button clicked')
    }

    return (
        <div className="update-btn" onClick={handleUpdateTask}>
            Update task (this btn will be put in task modal)
        </div>
    )
}

export default UpdateTask;