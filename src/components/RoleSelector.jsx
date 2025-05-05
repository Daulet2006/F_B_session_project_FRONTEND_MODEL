// src/components/RoleSelector.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import RoleBadge from './RoleBadge';
import { changeRole } from '../redux/authSlice';
import { setPermissions } from '../redux/permissionSlice';


const RoleSelector = () => {
  const dispatch = useDispatch();
  const { user, role } = useSelector(state => state.auth || {});
  const [loading, setLoading] = useState(false);

  // Список доступных ролей
  const availableRoles = [
    { id: 'CLIENT', name: 'Клиент' },
    { id: 'SELLER', name: 'Продавец' },
    { id: 'VETERINARIAN', name: 'Ветеринар' },
    { id: 'ADMIN', name: 'Администратор' },
    { id: 'OWNER', name: 'Владелец' }
  ];

  // Обработчик изменения роли
  const handleRoleChange = async (newRole) => {
    if (!user) {
      toast.error('Необходимо войти в систему для изменения роли');
      return;
    }

    setLoading(true);

    try {
      // В реальном приложении здесь будет запрос к API для изменения роли
      // Для демонстрации просто имитируем успешный ответ
      
      // Имитация задержки сети
      await new Promise(resolve => setTimeout(resolve, 500));

      // Обновляем данные пользователя в Redux
      dispatch(changeRole(newRole));
      
      // Обновляем разрешения пользователя на основе новой роли
      dispatch(setPermissions({
        interface_sections: getRoleSections(newRole),
        actions: getRoleActions(newRole)
      }));

      toast.success(`Роль изменена на "${getRoleName(newRole)}"`);
    } catch (error) {
      toast.error('Ошибка при изменении роли');
      console.error('Ошибка при изменении роли:', error);
    } finally {
      setLoading(false);
    }
  };

  // Получение названия роли
  const getRoleName = (roleId) => {
    const role = availableRoles.find(r => r.id === roleId);
    return role ? role.name : roleId;
  };

  // Получение разделов интерфейса для роли (для демонстрации)
  const getRoleSections = (roleId) => {
    const roleSections = {
      'CLIENT': ['profile', 'products', 'pets', 'orders', 'appointments', 'chat'],
      'SELLER': ['profile', 'products', 'pets', 'sales', 'chat'],
      'VETERINARIAN': ['profile', 'appointments', 'pets', 'chat'],
      'ADMIN': ['profile', 'users', 'products', 'pets', 'orders', 'appointments', 'categories', 'chat'],
      'OWNER': ['profile', 'users', 'products', 'pets', 'orders', 'appointments', 'categories', 'system', 'stats', 'chat']
    };

    return roleSections[roleId] || [];
  };

  // Получение действий для роли (для демонстрации)
  const getRoleActions = (roleId) => {
    const roleActions = {
      'CLIENT': [
        'view_products', 'view_pets', 'create_order', 'view_own_orders',
        'book_appointment', 'view_own_appointments', 'send_message'
      ],
      'SELLER': [
        'view_products', 'create_product', 'update_own_product', 'delete_own_product',
        'view_pets', 'create_pet', 'update_own_pet', 'delete_own_pet',
        'view_own_sales', 'send_message'
      ],
      'VETERINARIAN': [
        'view_appointments', 'update_appointment', 'view_pets', 'send_message'
      ],
      'ADMIN': [
        'view_all_users', 'update_user', 'delete_user',
        'view_all_products', 'update_any_product', 'delete_any_product',
        'view_all_pets', 'update_any_pet', 'delete_any_pet',
        'view_all_orders', 'update_any_order',
        'view_all_appointments', 'update_any_appointment',
        'manage_categories', 'send_message'
      ],
      'owner': [
        'view_all_users', 'update_user', 'delete_user',
        'view_all_products', 'update_any_product', 'delete_any_product',
        'view_all_pets', 'update_any_pet', 'delete_any_pet',
        'view_all_orders', 'update_any_order',
        'view_all_appointments', 'update_any_appointment',
        'manage_categories', 'manage_admins', 'view_system_stats',
        'configure_system', 'send_message'
      ]
    };

    return roleActions[roleId] || [];
  };

  if (!user) return null;

  return (
    <div className="role-selector p-4 bg-gray-100 rounded-lg mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Текущая роль:</h3>
        <RoleBadge role={role} />
      </div>
      
      <div className="mt-3">
        <p className="mb-2 text-sm text-gray-600">Изменить роль (для демонстрации):</p>
        <div className="flex flex-wrap gap-2">
          {availableRoles.map(availableRole => (
            <button
              key={availableRole.id}
              onClick={() => handleRoleChange(availableRole.id)}
              disabled={loading || role === availableRole.id}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors
                ${role === availableRole.id
                  ? 'bg-blue-600 text-white cursor-default'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {availableRole.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;