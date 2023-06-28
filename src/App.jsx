import { useEffect, useState } from "react";
import "./App.css";
import Task from "./components/Task";
import TaskForm from "./components/TaskForm";
import cx from "classnames";

function App() {
  const [tasks, setTasks] = useState([]);
  const [active, setActive] = useState("tab1");
  useEffect(() => {
    if (tasks.length === 0) return; // lúc đầu tasks = [] nên return không có gì cả
    localStorage.setItem("tasks", JSON.stringify(tasks)); // ngược lại length > 0 mới chạy dòng này
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    setTasks(tasks || []);
  }, []);

  function addTask(name) {
    setTasks((prev) => {
      return [...prev, { name: name, done: false }];
    });
    // setTasks([...tasks, {name: name, done: false}])
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  function removeTask(indexToRemove) {
    setTasks((prev) => prev.filter((_, index) => index !== indexToRemove));
  }

  function removeTaskAll() {
    setTasks([]);
  }

  function renameTask(indexToRename, newName) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[indexToRename].name = newName;
      return newTasks;
    });
  }

  return (
    <main>
      <h1>#To do</h1>
      <div className="tabs">
        <div className="tabs__links">
          <div
            onClick={() => setActive("tab1")}
            className={cx("tabs__link", { active: active === "tab1" })}
          >
            All
          </div>
          <div
            onClick={() => setActive("tab2")}
            className={cx("tabs__link", { active: active === "tab2" })}
          >
            active
          </div>
          <div
            onClick={() => setActive("tab3")}
            className={cx("tabs__link", { active: active === "tab3" })}
          >
            Completed
          </div>
        </div>
      </div>
      <TaskForm onAdd={addTask} active={active} />
      <div className={cx("taskLists", { show: active === "tab1" })}>
        {tasks.map((task, index) => (
          <Task
            {...task}
            key={index}
            onRename={(newName) => renameTask(index, newName)}
            onTrash={() => removeTask(index)}
            onToggle={(done) => updateTaskDone(index, done)}
          />
        ))}
      </div>

      <div className={cx("taskLists", { show: active === "tab2" })}>
        {tasks
          .filter((task) => task.done === false)
          .map((task, index) => (
            <Task
              {...task}
              key={index}
              onRename={(newName) => renameTask(index, newName)}
              onTrash={() => removeTask(index)}
              onToggle={(done) => updateTaskDone(index, done)}
            />
          ))}
      </div>

      <div className={cx("taskLists", { show: active === "tab3" })}>
        {tasks
          .filter((task) => task.done === true)
          .map((task, index) => (
            <Task
              {...task}
              key={index}
              onRename={(newName) => renameTask(index, newName)}
              onTrash={() => removeTask(index)}
              onToggle={(done) => updateTaskDone(index, done)}
            />
          ))}

        <div className="btnDelete" onClick={() => removeTaskAll()}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
          </svg>
          Delete all
        </div>
      </div>
    </main>
  );
}

export default App;
