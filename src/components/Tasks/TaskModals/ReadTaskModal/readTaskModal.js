import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./readTaskModal.scss";
import axios from 'axios';

const ReadTaskModal = ({ isShowing, hide, data }) => {
    const [deleteClicked, setDeleteClicked] = useState(false)

    const deleteTask = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/${data.id}`)
            setDeleteClicked(false)
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
                        <div className={deleteClicked ? "modal deleting" : "modal"}>
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="modal-close-button"
                                    data-dismiss="modal"
                                    onClick={() => { hide(); setDeleteClicked(false); }}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="read-modal-data">
                                <div>Title:</div>
                                <div>{data.title}</div>
                                <div>Description:</div>
                                <div>{data.description}</div>
                                <div>Priority:</div>
                                <div>{data.priority.replace(/^\w/, c => c.toUpperCase())}</div>
                            </div>
                            {!deleteClicked && (
                                <div className="read-modal-btns">
                                    <div className="read-update-btn">
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