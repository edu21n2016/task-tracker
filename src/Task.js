import React from 'react';

function Task({ task, index, toggleTaskCompletion, deleteTask }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <span onClick={() => toggleTaskCompletion(index)}>{task.text}</span>
      <button onClick={() => deleteTask(index)}>Delete</button>
    </li>
  );
}

export default Task;