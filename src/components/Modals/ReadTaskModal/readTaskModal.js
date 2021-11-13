import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./readTaskModal.scss";
import axios from 'axios';

const ReadTaskModal = ({ isShowing, hide, data, triggerParentUpdate }) => {
    const [deleteClicked, setDeleteClicked] = useState(false)
    const [updateClicked, setUpdateClicked] = useState(false)

    const useInput = (initialValue) => {
        const [value, setValue] = useState(initialValue);

        const handleChange = (e) => {
            setValue(e.target.value);
        };

        return [value, handleChange];
    };

    const [title, setTitle] = useInput(data.title)
    const [description, setDescription] = useInput(data.description)
    const [priority, setPriority] = useInput(data.priority)

    const deleteTask = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/${data.id}`)
            triggerParentUpdate('delete', title)
            setDeleteClicked(false)
            hide()
        } catch (err) {
            console.error(err)
        }
    }

    const updateTask = async () => {
        const updateTaskData = {
            title: title,
            description: description,
            priority: priority
        }
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/${data.id}`, updateTaskData)
            triggerParentUpdate('update', title)
            setUpdateClicked(false)
            hide()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        isShowing
            ? ReactDOM.createPortal(
                <React.Fragment>
                    <div className="modal-overlay" />
                    <div className="modal-wrapper">
                        <div className="modal">
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="modal-close-button"
                                    data-dismiss="modal"
                                    onClick={() => { hide(); setDeleteClicked(false); setUpdateClicked(false) }}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                            {!updateClicked && (
                                <div className="read-modal-data">
                                    <div>Title:</div>
                                    <div>{title}</div>
                                    <div>Description:</div>
                                    <div>{description}</div>
                                    <div>Priority:</div>
                                    <div>{priority.replace(/^\w/, c => c.toUpperCase())}</div>
                                </div>
                            )}
                            {updateClicked && (
                                <div>
                                    <div className="read-modal-data">
                                        <div>Title:</div>
                                        <input
                                            value={title}
                                            onChange={setTitle}
                                        />
                                        <div>Description:</div>
                                        <textarea
                                            value={description}
                                            onChange={setDescription}
                                        />
                                        <div>Priority:</div>
                                        <select
                                            value={priority}
                                            onChange={setPriority}
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </div>
                                    <div className="read-modal-btns">
                                        <div className="read-cancel-btn" onClick={() => setUpdateClicked(false)}>
                                            Cancel
                                        </div>
                                        <div className="read-update-btn" onClick={updateTask}>
                                            Update
                                        </div>
                                    </div>
                                </div>
                            )}
                            {!deleteClicked && !updateClicked && (
                                <div className="read-modal-btns">
                                    <div className="read-update-btn" onClick={() => setUpdateClicked(true)}>
                                        Update
                                    </div>
                                    <div className="read-delete-btn" onClick={() => setDeleteClicked(true)}>
                                        Delete
                                    </div>
                                </div>
                            )}
                            {deleteClicked && (
                                <div className="confirm-delete">
                                    <div>Are you sure?</div>
                                    <div className="confirm-delete-btn" onClick={deleteTask}>Delete</div>
                                    <div className="cancel-delete-btn" onClick={() => setDeleteClicked(false)}>Cancel</div>
                                </div>
                            )}
                        </div>
                    </div>
                </React.Fragment>,
                document.body
            )
            : null
    )
}

export default ReadTaskModal;