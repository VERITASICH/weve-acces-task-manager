// Импорт необходимых модулей и компонентов
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/navBar';
import Main from './components/pages/mainPage';
import Daily from './components/pages/Daily';
import Weekly from './components/pages/Weekly';
import { useEffect, useState } from 'react';
import { mockTasks } from './mockData/mockTasks';
import Add from './components/pages/Add';

/**
 * Главный компонент приложения.
 * Обеспечивает маршрутизацию и управление состоянием задач.
 */
function App() {
  // Состояние для хранения списка задач
  const [tasks, setTasks] = useState([]);

  // Эффект для имитации загрузки задач с сервера
  useEffect(() => {
    setTimeout(() => {
      setTasks(mockTasks); // Устанавливаем моковые данные через 2 секунды
    }, 2000);
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только при монтировании

  /**
   * Функция для добавления новой задачи в список.
   * @param {Object} newTask - Новая задача, которую нужно добавить.
   */
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]); // Добавляем новую задачу в массив
  };

  // Функция для удаления задачи
  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

   // Функция для изменения статуса задачи
   const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Функции для работы с архивом
const handleCompleteTask = (taskId) => {
  setTasks(tasks.map(task => 
    task.id === taskId 
      ? { ...task, completed: true, completionDate: new Date().toISOString() }
      : task
  ));
};

const handleRestoreTask = (taskId) => {
  setTasks(tasks.map(task => 
    task.id === taskId 
      ? { ...task, completed: false, completionDate: null }
      : task
  ));
};

const handleDeletePermanently = (taskId) => {
  setTasks(tasks.filter(task => task.id !== taskId));
};

  return (
    // Обертка для маршрутизации (BrowserRouter)
    <BrowserRouter>
      <div className="app">
        {/* Навигационное меню */}
        <NavBar />

        {/* Основные маршруты приложения */}
        <Routes>
          {/* Главная страница (список задач) */}
          <Route
            path="/"
            element={<Main tasks={tasks} />} // Передаем задачи в компонент Main
          />

          {/* Страница ежедневных задач */}
          <Route
            path="/daily"
            element={<Daily
                        tasks={tasks} 
                        onDeleteTask={handleDeleteTask} 
                        onToggleComplete={handleToggleComplete} 
                    />} // Передаем tasks, handleToggleComplete и handleDeleteTask в Daily
          />
        </Routes>

        {/* Дополнительные маршруты */}
        <Routes>
          {/* Страница еженедельных задач */}
          <Route
            path="/weekly"
            element={<Weekly
                        tasks={tasks}
                        onRestoreTask={handleRestoreTask}
                        onDeletePermanently={handleDeletePermanently}
                    />}
          />

          {/* Страница добавления новой задачи */}
          <Route
            path="/add"
            element={<Add addTask={addTask} />} // Передаем функцию добавления задачи
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;