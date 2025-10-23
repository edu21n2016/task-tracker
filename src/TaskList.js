import React from "react";
import Task from "./Task";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function TaskList({ tasks, setTasks, filter, searchTerm, toggleTaskCompletion, deleteTask, editTask }) {

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const reordered = Array.from(tasks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    setTasks(reordered);
  };

  const displayedTasks = tasks.filter(task => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'completed' && task.completed) ||
      (filter === 'active' && !task.completed);
    const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="taskList">
        {(provided) => (
          <ul className="task-list" {...provided.droppableProps} ref={provided.innerRef}>
            {displayedTasks.map((task, index) => (
              <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <Task
                      task={task}
                      toggleTaskCompletion={toggleTaskCompletion}
                      deleteTask={deleteTask}
                      editTask={editTask}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TaskList;
