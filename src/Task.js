import React, { useState } from "react";

function Task({ task, toggleTaskCompletion, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    editTask(task.id, newText);
    setIsEditing(false);
  };

  // defensive defaults for priority and dueDate to avoid runtime errors
  const priority = (task && task.priority) ? task.priority : 'low';
  const dueDate = (task && task.dueDate) ? task.dueDate : '';

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleEdit}
          autoFocus
        />
      ) : (
        <span onClick={() => toggleTaskCompletion(task.id)}>
          {task.text}
          <span className={`priority-indicator priority-${priority}`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </span>
          {dueDate && ` - Due: ${dueDate}`}
        </span>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "Save" : "Edit"}
      </button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
}

export default Task;
