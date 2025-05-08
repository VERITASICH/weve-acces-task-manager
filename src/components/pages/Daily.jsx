import React, { useState } from 'react';

const Daily = ({ tasks, onDeleteTask, onToggleComplete }) => {
  const [timeRange, setTimeRange] = useState('day');

  // Получаем текущую дату в формате "YYYY-MM-DD"
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Получаем даты начала и конца недели
  const getWeekRange = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    
    return {
      start: monday.toISOString().split('T')[0],
      end: sunday.toISOString().split('T')[0]
    };
  };

  // Получаем даты начала и конца месяца
  const getMonthRange = () => {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    
    return {
      start: firstDay.toISOString().split('T')[0],
      end: lastDay.toISOString().split('T')[0]
    };
  };

  // Фильтруем задачи по выбранному периоду
  const filteredTasks = tasks.filter(task => {
    if (!task.dueDate) return false;
    
    switch(timeRange) {
      case 'day':
        return task.dueDate === getCurrentDate();
      case 'week':
        const week = getWeekRange();
        return task.dueDate >= week.start && task.dueDate <= week.end;
      case 'month':
        const month = getMonthRange();
        return task.dueDate >= month.start && task.dueDate <= month.end;
      default:
        return false;
    }
  });

  // Сортируем задачи по приоритету
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  // Обработчик удаления задачи
  const handleDelete = (taskId) => {
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      onDeleteTask(taskId);
    }
  };

  // Компонент отдельной задачи
  const TaskItem = ({ task }) => {
    return (
      <li className={`task-item ${task.priority} ${task.completed ? 'completed' : ''}`}>
        <div className="task-header">
          <h3>{task.title}</h3>
          <span className="task-date">{formatDate(task.dueDate)}</span>
        </div>
        <p className="task-description">{task.description}</p>
        <div className="task-footer">
          <span className={`priority-badge ${task.priority}`}>
            {getPriorityLabel(task.priority)}
          </span>
          <div className="task-actions">
            <span 
              className={`task-status ${task.completed ? 'completed' : ''}`}
              onClick={() => onToggleComplete(task.id)}
              style={{ cursor: 'pointer' }}
            >
              {task.completed ? '✓ Выполнено' : '⏳ В работе'}
            </span>
            <button 
              className="delete-btn"
              onClick={() => handleDelete(task.id)}
              title="Удалить задачу"
            >
              ×
            </button>
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="daily-container">
      <div className="tasks-view">
        <div className="time-range-selector">
          <button 
            className={timeRange === 'day' ? 'active' : ''}
            onClick={() => setTimeRange('day')}
          >
            На сегодня
          </button>
          <button 
            className={timeRange === 'week' ? 'active' : ''}
            onClick={() => setTimeRange('week')}
          >
            На неделю
          </button>
          <button 
            className={timeRange === 'month' ? 'active' : ''}
            onClick={() => setTimeRange('month')}
          >
            На месяц
          </button>
        </div>

        <h2>
          {timeRange === 'day' && `Задачи на ${formatDate(getCurrentDate())}`}
          {timeRange === 'week' && `Задачи на неделю (${formatDate(getWeekRange().start)} - ${formatDate(getWeekRange().end)})`}
          {timeRange === 'month' && `Задачи на ${new Date().toLocaleDateString('ru-RU', { month: 'long' })}`}
        </h2>

        {sortedTasks.length === 0 ? (
          <p className="no-tasks">Нет задач на выбранный период</p>
        ) : (
          <ul className="task-list">
            {sortedTasks.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
        )}
      </div>
      
      <div className="stats-panel">
        <h3>Статистика</h3>
        <div className="stats-item">
          <span>Всего задач:</span>
          <span>{filteredTasks.length}</span>
        </div>
        <div className="stats-item">
          <span>Высокий приоритет:</span>
          <span>{filteredTasks.filter(t => t.priority === 'high').length}</span>
        </div>
        <div className="stats-item">
          <span>Завершено:</span>
          <span>{filteredTasks.filter(t => t.completed).length}</span>
        </div>
      </div>
    </div>
  );
};

// Вспомогательные функции
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long'
  });
};

const getPriorityLabel = (priority) => {
  const labels = {
    high: 'Высокий',
    medium: 'Средний',
    low: 'Низкий'
  };
  return labels[priority] || priority;
};

export default Daily;