import React from 'react';

function TaskFilter({ filter, setFilter }) {
  const filters = ['all', 'active', 'completed'];
  return (
    <div className="filter-buttons">
      {filters.map(f => (
        <button
          key={f}
          className={filter === f ? 'active' : ''}
          onClick={() => setFilter(f)}
          style={filter === f ? { background: 'linear-gradient(90deg, #6366f1, #10b981)', color: '#fff' } : {}}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
