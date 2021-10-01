import React from "react";
import "./createTask.scss";

import CreateTaskModal from "../TaskModals/CreateTaskModal/createTaskModal";
import useModal from "../TaskModals/utilities/useModal";

const CreateTask = () => {
    const { isShowing, toggle } = useModal()

    return (
        <div>
            <div className="create-btn" onClick={() => toggle()}>
                Create new task
            </div>
            <CreateTaskModal isShowing={isShowing} hide={toggle} />
        </div>
    )
}

export default CreateTask;