import React, { useState } from "react";
import cx from "classnames";

const TaskForm = ({ onAdd, active }) => {
  const [taskName, setTaskName] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    onAdd(taskName);
    setTaskName("");
  }
  return (
    <form onSubmit={handleSubmit} className={cx("formTask", { hide: active === "tab3" })}>
      <div className="taskForm__wrapper">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="add details"
        />
      </div>
      <div className="btn" onClick={handleSubmit}>
        Add
      </div>
    </form>
  );
};

export default TaskForm;
