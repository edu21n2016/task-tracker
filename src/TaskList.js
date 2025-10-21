import React from 'react';
import Task from './Task';

function TaskList({ tasks, toggleTaskCompletion, deleteTask }) {
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          index={index}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;