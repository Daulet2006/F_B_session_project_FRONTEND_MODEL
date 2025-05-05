// src/components/RoleDashboard.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { SECTION_DESCRIPTIONS, ACTION_DESCRIPTIONS } from '../constants/ROLE_PERMISSIONS';
import RoleBadge from './RoleBadge';
import { selectAvailableSections, selectAvailableActions } from '../redux/permissionSlice';

/**
 * Компонент для отображения информации о ролях и их правах
 * Используется в Dashboard для демонстрации системы ролевого доступа
 */
const RoleDashboard = () => {
  const { user } = useSelector(state => state.auth || {});
  const { loading: permissionsLoading } = useSelector(state => state.permissions || {});
  
  // Используем селекторы для получения доступных разделов и действий
  const availableSections = useSelector(selectAvailableSections);
  const availableActions = useSelector(selectAvailableActions);

  if (permissionsLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Для просмотра информации о ролях и правах необходимо авторизоваться.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Получаем информацию о текущей роли
  const currentRole = user.role;
  // Используем данные из Redux store вместо прямого доступа к константам
  const roleSections = availableSections;
  const roleActions = availableActions;

  return (
    <div className="bg-white rounded-xl p-5 shadow-lg border-2 border-gray-200 mb-8">
      <h2 className="text-2xl font-semibold text-green-800 mb-4">Информация о правах роли</h2>
      
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <span className="font-medium mr-2">Текущая роль:</span>
          <RoleBadge role={currentRole} />
        </div>
        <p className="text-gray-600 text-sm">
          Каждая роль имеет свой набор прав и доступных разделов интерфейса.
        </p>
      </div>

      {/* Доступные разделы */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-green-700 mb-2">Доступные разделы:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {roleSections.map(section => (
            <div key={section} className="bg-green-50 p-2 rounded border border-green-200">
              <span className="font-medium">{SECTION_DESCRIPTIONS[section] || section}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Доступные действия */}
      <div>
        <h3 className="text-lg font-medium text-green-700 mb-2">Доступные действия:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {roleActions.map(action => (
            <div key={action} className="bg-blue-50 p-2 rounded border border-blue-200">
              <span>{ACTION_DESCRIPTIONS[action] || action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleDashboard;