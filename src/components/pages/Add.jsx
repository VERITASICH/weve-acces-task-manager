import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Компонент для добавления новой задачи
 * @param {Function} addTask - Функция добавления задачи, передаваемая из родительского компонента
 */
const Add = ({ addTask }) => {
    // Состояния для полей формы
    const [title, setTitle] = useState(''); // Название задачи
    const [description, setDescription] = useState(''); // Описание задачи
    const [priority, setPriority] = useState('medium'); // Приоритет (по умолчанию 'medium')
    const [dueDate, setDueDate] = useState(''); // Срок выполнения
    const [errors, setErrors] = useState({}); // Объект для хранения ошибок валидации

    /**
     * Валидация формы перед отправкой
     * @returns {boolean} true если валидация прошла успешно, false если есть ошибки
     */
    const validateForm = () => {
        const newErrors = {};
        
        // Проверка названия задачи
        if (!title.trim()) {
            newErrors.title = 'Название задачи обязательно';
        }
        
        // Проверка описания задачи
        if (!description.trim()) {
            newErrors.description = 'Описание задачи обязательно';
        }
        
        // Проверка срока выполнения
        if (!dueDate) {
            newErrors.dueDate = 'Укажите срок выполнения';
        }
        
        // Устанавливаем новые ошибки
        setErrors(newErrors);
        
        // Если объект ошибок пуст - форма валидна
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Обработчик отправки формы
     * @param {Event} e - Событие формы
     */
    const handleSubmit = (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение формы
        
        // Проверяем валидность формы
        if (!validateForm()) {
            return; // Прерываем выполнение если есть ошибки
        }
        
        // Создаем новый объект задачи
        const newTask = {
            id: Date.now(), // Уникальный ID на основе текущего времени
            title: title.trim(), // Удаляем лишние пробелы
            description: description.trim(),
            priority,
            dueDate,
            completed: false, // Новая задача всегда невыполненная
        };
        console.log(newTask) //вывод задачи в консоль для проверки

        // Передаем задачу в родительский компонент
        addTask(newTask);

        // Показываем уведомление
        toast.success('Задача успешно добавлена!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        // Сбрасываем состояние формы
        setTitle('');
        setDescription('');
        setPriority('medium');
        setDueDate('');
        setErrors({}); // Очищаем ошибки
    };

    return ( 
        <><h1 className='form-label'>Создайте новую задачу</h1>
        <div className='form-page'>

            {/* Добавляем контейнер для уведомлений */}
            <ToastContainer />
            {/* Форма добавления задачи */}
            <form onSubmit={handleSubmit} className='task-form'>

                {/* Поле для названия задачи */}
                <div className='form-group'>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Введите название задачи'
                        className={errors.title ? 'error' : ''} // Добавляем класс ошибки если есть
                    />
                    {/* Отображение ошибки для названия */}
                    {errors.title && (
                        <span className="error-message">{errors.title}</span>
                    )}
                </div>

                {/* Поле для описания задачи */}
                <div className='form-group'>
                    <input
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder='Опишите задачу'
                        className={errors.description ? 'error' : ''} />
                    {/* Отображение ошибки для описания */}
                    {errors.description && (
                        <span className="error-message">{errors.description}</span>
                    )}
                </div>

                {/* Выбор приоритета задачи */}
                <div className='form-group'>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value='low'>Низкий</option>
                        <option value='medium'>Средний</option>
                        <option value='high'>Высокий</option>
                    </select>
                </div>

                {/* Поле для выбора даты выполнения */}
                <div className="form-group">
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]} // Запрещаем выбор прошедших дат
                        className={errors.dueDate ? 'error' : ''} />
                    {/* Отображение ошибки для даты */}
                    {errors.dueDate && (
                        <span className="error-message">{errors.dueDate}</span>
                    )}
                </div>

                {/* Кнопка отправки формы */}
                <button type="submit">Добавить задачу</button>
            </form>
        </div></>
    );
};

export default Add;