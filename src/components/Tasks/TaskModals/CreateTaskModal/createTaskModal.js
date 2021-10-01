import React from "react";
import ReactDOM from "react-dom";
import "./createTaskModal.scss";

const CreateTaskModal = ({ isShowing, hide, data }) =>
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
                                onClick={hide}
                            >
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-data">
                            Create fields will go here
                        </div>
                    </div>
                </div>
            </React.Fragment>,
            document.body
        )
        : null;

export default CreateTaskModal;