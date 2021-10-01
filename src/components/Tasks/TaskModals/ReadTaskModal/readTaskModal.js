import React from "react";
import ReactDOM from "react-dom";
import "./readTaskModal.scss";

const ReadTaskModal = ({ isShowing, hide, data }) =>
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
                            <div>
                                Title: {data.title}
                            </div>
                            <div>
                                Description: {data.description}
                            </div>
                            <div>
                                Priority: {data.priority.replace(/^\w/, c => c.toUpperCase())}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>,
            document.body
        )
        : null;

export default ReadTaskModal;