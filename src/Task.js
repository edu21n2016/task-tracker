import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';

function Task({ task, index, toggleTaskCompletion, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    editTask(task.id, newText);
    setIsEditing(false);
  };

  const priorityColors = {
    low: '#10b981',
    medium: '#facc15',
    high: '#ef4444'
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <li
          className={`task-item ${task.completed ? 'completed' : ''}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {isEditing ? (
            <input
              type="text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onBlur={handleEdit}
              autoFocus
            />
          ) : (
            <div className="task-text" onClick={() => toggleTaskCompletion(task.id)}>
              {task.text}
              {task.dueDate && <span className="due-date"> - Due: {task.dueDate}</span>}
            </div>
          )}

          <span
            className="priority-badge"
            style={{ backgroundColor: priorityColors[task.priority] }}
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>

          <div className="task-btns">
            <button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Save' : 'Edit'}
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </li>
      )}
    </Draggable>
  );
}

export default Task;
