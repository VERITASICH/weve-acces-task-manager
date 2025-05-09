import React from 'react';
import { Link, useLocation } from 'react-router-dom';


const NavBar = () => {
    const location = useLocation();

    return ( 
        <nav className='nav'>
            <Link 
                to='/weve-acces-task-manager' 
                className={
                    
                    location.pathname === '/weve-acces-task-manager' 
                        ? 'active' 
                        : ''
                }
            >
            Главная    
            </Link>
            <Link 
                to='/daily' 
                className={
                    location.pathname === '/daily' 
                        ? 'active' 
                        : ''
                }
            >
            Задачи     
            </Link>
            <Link 
                to='/weekly' 
                className={
                    
                    location.pathname === '/weekly' 
                        ? 'active' 
                        : ''
                }
            >
            Архив    
            </Link>
            <Link 
                to='/add' 
                className={
                    location.pathname === '/add' 
                        ? 'active' 
                        : ''
                }
            >
            Добавление задачи    
            </Link>
        </nav>
    );
}
 
export default NavBar;