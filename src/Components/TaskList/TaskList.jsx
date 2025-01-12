import React from 'react';
import './TaskList.css';

const TaskList = ({ tasks, deleteTask }) => {
  if (tasks.length === 0) {
    return <div className="empty-message"> Task list is empty </div>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task-item">
          <span className="task-title">{task.title}</span>
          <button 
            className="delete-button" 
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
