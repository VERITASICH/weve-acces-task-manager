import React from 'react';

const MainPage = ({ tasks }) => {
  // Фильтруем задачи с высоким приоритетом
  const highPriorityTasks = tasks.filter(task => task.priority === 'high');
  
  // Выбираем топ-5 задач (или все, если их меньше 5)
  const topTasks = highPriorityTasks.slice(0, 5);

  return (
    <div className="main-page">
      <h2>Топ приоритетных задач</h2>
      
      {highPriorityTasks.length === 0 ? (
        <div className="no-tasks-message">
          <p>Нет задач с высоким приоритетом</p>
          <p>Все спокойно, можно отдохнуть ☕</p>
        </div>
      ) : (
        <ul className="task-list">
          {topTasks.map(task => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-header">
                <h3>{task.title}</h3>
                {task.dueDate && (
                  <span className="task-date">
                    {new Date(task.dueDate).toLocaleDateString('ru-RU')}
                  </span>
                )}
              </div>
              <p className="task-description">{task.description}</p>
              <div className="task-footer">
                <span className="priority-badge high">Высокий приоритет</span>
                <span className={`task-status ${task.completed ? 'completed' : ''}`}>
                  {task.completed ? '✓ Выполнено' : '⏳ В работе'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      
      {highPriorityTasks.length > 5 && (
        <div className="tasks-count">
          Показано 5 из {highPriorityTasks.length} задач с высоким приоритетом
        </div>
      )}
    </div>
  );
};

export default MainPage;