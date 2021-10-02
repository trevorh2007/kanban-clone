import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./createTaskModal.scss";
import axios from "axios";

const CreateTaskModal = ({ isShowing, hide, triggerParentUpdate }) => {

    const useInput = (initialValue) => {
        const [value, setValue] = useState(initialValue);

        const handleChange = (e) => {
            setValue(e.target.value);
        };

        return [value, handleChange];
    };

    const [title, setTitle] = useInput('')
    const [description, setDescription] = useInput('')
    const [priority, setPriority] = useInput('low')

    const createTask = async () => {
        const createTaskData = {
            title: title,
            description: description,
            priority: priority,
            column_id: 1
        }
        try {
            await axios.post(process.env.REACT_APP_API_URL, createTaskData)
            triggerParentUpdate()
            hide()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        isShowing ? ReactDOM.createPortal(
            <React.Fragment>
                <div className="modal-overlay" />
                <div className="modal-wrapper">
                    <div className="modal">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="modal-close-button"
                                data-dismiss="modal"
                                onClick={hide}
                            >
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-data">
                            <div className="modal-title">
                                Create new Task
                            </div>
                            <form>
                                <div className="new-task-data">
                                    <div>Title:</div>
                                    <input
                                        placeholder="Name"
                                        value={title}
                                        onChange={setTitle}
                                        required
                                    />
                                    <div>Description:</div>
                                    <textarea
                                        placeholder="Description"
                                        value={description}
                                        onChange={setDescription}
                                        required
                                    />
                                    <div>Priority:</div>
                                    <select
                                        onChange={setPriority}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                                <div type="submit" className="create-btn-modal" onClick={createTask}>
                                    Create
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>,
            document.body
        )
            : null
    )
}

export default CreateTaskModal;