// src/components/RoleBasedNavigation.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import RoleBasedInterface from './RoleBasedInterface';
import { selectInterfaceSections } from '../redux/permissionSlice';

// Разделы интерфейса по ролям
const ROLE_SECTIONS = {
  'CLIENT': [
    { id: 'profile', icon: 'fas fa-user', label: 'Профиль' },
    { id: 'products', icon: 'fas fa-box', label: 'Товары' },
    { id: 'pets', icon: 'fas fa-paw', label: 'Питомцы' },
    { id: 'orders', icon: 'fas fa-shopping-cart', label: 'Мои заказы' },
    { id: 'appointments', icon: 'fas fa-calendar-alt', label: 'Записи к ветеринару' },
    { id: 'chat', icon: 'fas fa-comments', label: 'Чат' }
  ],
  'SELLER': [
    { id: 'profile', icon: 'fas fa-user', label: 'Профиль' },
    { id: 'products', icon: 'fas fa-box', label: 'Управление товарами' },
    { id: 'pets', icon: 'fas fa-paw', label: 'Управление питомцами' },
    { id: 'sales', icon: 'fas fa-chart-line', label: 'Мои продажи' },
    { id: 'chat', icon: 'fas fa-comments', label: 'Чат с клиентами' }
  ],
  'VETERINARIAN': [
    { id: 'profile', icon: 'fas fa-user', label: 'Профиль' },
    { id: 'appointments', icon: 'fas fa-calendar-alt', label: 'Управление приемами' },
    { id: 'pets', icon: 'fas fa-paw', label: 'Питомцы на приеме' },
    { id: 'chat', icon: 'fas fa-comments', label: 'Чат с клиентами' }
  ],
  'ADMIN': [
    { id: 'profile', icon: 'fas fa-user', label: 'Профиль' },
    { id: 'users', icon: 'fas fa-users', label: 'Управление пользователями' },
    { id: 'products', icon: 'fas fa-box', label: 'Управление товарами' },
    { id: 'pets', icon: 'fas fa-paw', label: 'Управление питомцами' },
    { id: 'orders', icon: 'fas fa-shopping-cart', label: 'Все заказы' },
    { id: 'appointments', icon: 'fas fa-calendar-alt', label: 'Все записи' },
    { id: 'categories', icon: 'fas fa-tags', label: 'Категории' },
    { id: 'chat', icon: 'fas fa-comments', label: 'Чат поддержки' }
  ],
  'OWNER': [
    { id: 'profile', icon: 'fas fa-user', label: 'Профиль' },
    { id: 'users', icon: 'fas fa-users', label: 'Управление пользователями' },
    { id: 'products', icon: 'fas fa-box', label: 'Управление товарами' },
    { id: 'pets', icon: 'fas fa-paw', label: 'Управление питомцами' },
    { id: 'orders', icon: 'fas fa-shopping-cart', label: 'Все заказы' },
    { id: 'appointments', icon: 'fas fa-calendar-alt', label: 'Все записи' },
    { id: 'categories', icon: 'fas fa-tags', label: 'Категории' },
    { id: 'system', icon: 'fas fa-cogs', label: 'Настройки платформы' },
    { id: 'stats', icon: 'fas fa-chart-bar', label: 'Аналитика' },
    { id: 'chat', icon: 'fas fa-comments', label: 'Чат поддержки' }
  ]
};

// Маршруты для разделов
const SECTION_ROUTES = {
  'profile': '/profile',
  'products': '/products',
  'pets': '/animals',
  'orders': '/my-orders',
  'appointments': '/my-appointments',
  'users': '/users',
  'categories': '/categories',
  'sales': '/sales',
  'system': '/system',
  'stats': '/stats',
  'chat': '/chat'
};

// Действия для проверки разрешений
const SECTION_ACTIONS = {
  'profile': ['view_profile'],
  'products': ['view_products', 'create_product'],
  'pets': ['view_pets', 'create_pet'],
  'orders': ['view_own_orders', 'create_order'],
  'appointments': ['view_own_appointments', 'book_appointment'],
  'users': ['view_all_users'],
  'categories': ['manage_categories'],
  'sales': ['view_own_sales'],
  'system': ['configure_system'],
  'stats': ['view_system_stats'],
  'chat': ['send_message']
};

const RoleBasedNavigation = () => {
  const { user } = useSelector(state => state.auth || {});
  const interfaceSections = useSelector(selectInterfaceSections);

  // Разделы по умолчанию для гостей
  const defaultSections = [
    { id: 'products', icon: 'fas fa-box', label: 'Товары' },
    { id: 'pets', icon: 'fas fa-paw', label: 'Питомцы' }
  ];

  // Разделы по роли
  const roleSections = user && user.role && ROLE_SECTIONS[user.role]
    ? ROLE_SECTIONS[user.role]
    : defaultSections;

  return (
    <nav className="role-based-navigation bg-green-800 text-white p-4 rounded-lg shadow-lg mt-4">
      <ul className="flex flex-wrap justify-center gap-4">
        {/* Для неавторизованных пользователей */}
        {!user && defaultSections.map((section) => (
          <li key={section.id} className="nav-item">
            <Link 
              to={SECTION_ROUTES[section.id] || '/'} 
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              <i className={section.icon}></i>
              <span>{section.label}</span>
            </Link>
          </li>
        ))}

        {/* Для авторизованных пользователей с фильтрацией по interfaceSections */}
        {user && roleSections
          .filter(section => interfaceSections.includes(section.id))
          .map((section) => (
            <RoleBasedInterface 
              key={section.id} 
              requiredSection={section.id}
              requiredAction={SECTION_ACTIONS[section.id]?.[0]}
            >
              <li className="nav-item">
                <Link 
                  to={SECTION_ROUTES[section.id] || '/'} 
                  className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-green-700 transition"
                  onClick={(e) => {
                    if (!SECTION_ROUTES[section.id]) {
                      e.preventDefault();
                      toast.info(`Раздел "${section.label}" находится в разработке`);
                    }
                  }}
                >
                  <i className={section.icon}></i>
                  <span>{section.label}</span>
                </Link>
              </li>
            </RoleBasedInterface>
        ))}
      </ul>
    </nav>
  );
};

export default RoleBasedNavigation;
