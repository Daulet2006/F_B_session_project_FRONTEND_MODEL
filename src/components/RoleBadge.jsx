// src/components/RoleBadge.jsx
import React from 'react';


const RoleBadge = ({ role }) => {
  // Определяем цвет значка в зависимости от роли
  const getBadgeColor = () => {
    const roleValue = role?.toUpperCase() || '';
    switch (roleValue) {
      case 'ADMIN':
        return 'bg-red-600 text-white';
      case 'OWNER':
        return 'bg-purple-700 text-white';
      case 'SELLER':
        return 'bg-blue-600 text-white';
      case 'VETERINARIAN':
        return 'bg-green-600 text-white';
      case 'CLIENT':
        return 'bg-gray-600 text-white';
      default:
        return 'bg-gray-400 text-gray-800';
    }
  };

  // Форматируем название роли для отображения
  const formatRoleName = () => {
    if (!role) {
      return 'Гость';
    }
    
    const roleMap = {
      'ADMIN': 'Администратор',
      'OWNER': 'Владелец',
      'SELLER': 'Продавец',
      'VETERINARIAN': 'Ветеринар',
      'CLIENT': 'Клиент'
    };
    
    return roleMap[role.toUpperCase()] || role;
  };

  return (
    <span className={`role-badge px-2 py-1 rounded-full text-xs font-bold ${getBadgeColor()}`}>
      {formatRoleName()}
    </span>
  );
};

export default RoleBadge;