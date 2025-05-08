// Archive.jsx
import React, { useState } from 'react';
// import './Archive.css';

const Weekly = ({ tasks, onRestoreTask, onDeletePermanently }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  // Фильтрация и сортировка выполненных задач
  const completedTasks = tasks
    .filter(task => task.completed)
    .filter(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.completionDate) - new Date(a.completionDate);
      } else {
        return new Date(a.completionDate) - new Date(b.completionDate);
      }
    });

  return (
    <div className="archive-page">
      <div className="archive-header">
        <h2>Архив задач</h2>
        <div className="archive-controls">
          <input
            type="text"
            placeholder="Поиск в архиве..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="newest">Сначала новые</option>
            <option value="oldest">Сначала старые</option>
          </select>
        </div>
      </div>

      {completedTasks.length === 0 ? (
        <div className="empty-archive">
          <img src="/empty-archive.svg" alt="Архив пуст" />
          <p>Здесь будут храниться выполненные задачи</p>
        </div>
      ) : (
        <div className="archive-stats">
          <p>Найдено задач: {completedTasks.length}</p>
        </div>
      )}

      <div className="archived-tasks">
        {completedTasks.map(task => (
          <div key={task.id} className="archived-task">
            <div className="task-main-info">
              <h3 className="task-title">{task.title}</h3>
              <p className="task-description">{task.description}</p>
              <div className="task-meta">
                <span className="completion-date">
                  Выполнено: {new Date(task.completionDate).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
                <span className={`priority-tag ${task.priority}`}>
                  {task.priority === 'high' ? 'Высокий' : 
                   task.priority === 'medium' ? 'Средний' : 'Низкий'} приоритет
                </span>
              </div>
            </div>
            <div className="task-actions">
              <button 
                onClick={() => onRestoreTask(task.id)}
                className="restore-btn"
              >
                Восстановить
              </button>
              <button
                onClick={() => onDeletePermanently(task.id)}
                className="delete-btn"
              >
                Удалить навсегда
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weekly;