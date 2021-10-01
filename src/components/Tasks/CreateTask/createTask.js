import React from "react";
import "./createTask.scss";
import axios from 'axios';

const CreateTask = () => {

    const handleCreateNewTask = async () => {
        console.log('New task button clicked')
        // data backend is expecting
        // {
        //     "title": "Fifth generated task",
        //     "description": "The fifth task created with the api",
        //     "priority": "high",
        //     "column_id": 1
        // }

        // try {
        //     const newTask = await axios.post(process.env.REACT_APP_API_URL)
        // } catch (err) {
        //     console.error(err)
        // }
    }

    return (
        <div className="create-btn" onClick={handleCreateNewTask}>
            Create new task
        </div>
    )
}

export default CreateTask;