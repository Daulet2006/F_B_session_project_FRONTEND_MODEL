// src/components/AccessDenied.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RoleBadge from './RoleBadge';

/**
 * Компонент для отображения страницы с отказом в доступе
 * Показывается, когда пользователь пытается получить доступ к странице, для которой у него нет прав
 */
const AccessDenied = ({ requiredSection, requiredAction }) => {
  const { user } = useSelector(state => state.auth || {});

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-red-200 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <svg className="h-16 w-16 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-red-600 mb-4">Доступ запрещен</h1>
        
        <p className="text-gray-700 mb-6">
          У вас недостаточно прав для доступа к этой странице.
        </p>
        
        {user && (
          <div className="mb-6">
            <p className="text-gray-600 mb-2">Ваша текущая роль:</p>
            <div className="flex justify-center">
              <RoleBadge role={user.role} />
            </div>
          </div>
        )}
        
        {requiredSection && (
          <p className="text-sm text-gray-500 mb-2">
            Требуется доступ к разделу: <span className="font-medium">{requiredSection}</span>
          </p>
        )}
        
        {requiredAction && (
          <p className="text-sm text-gray-500 mb-4">
            Требуется разрешение: <span className="font-medium">{requiredAction}</span>
          </p>
        )}
        
        <div className="flex flex-col space-y-2">
          <Link to="/" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
            Вернуться на главную
          </Link>
          
          {!user && (
            <Link to="/login" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              Войти в систему
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;