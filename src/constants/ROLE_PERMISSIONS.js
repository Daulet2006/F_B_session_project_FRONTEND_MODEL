// src/constants/ROLE_PERMISSIONS.js

/**
 * Константы с разрешениями для каждой роли в системе
 * Используются для управления доступом к различным частям интерфейса
 */

// Разделы интерфейса для каждой роли
const ROLE_SECTIONS = {
  'CLIENT': [
    'profile', 'products', 'pets', 'orders', 'appointments', 'chat'
  ],
  'SELLER': [
    'profile', 'products', 'pets', 'sales', 'chat'
  ],
  'VETERINARIAN': [
    'profile', 'appointments', 'pets', 'chat'
  ],
  'ADMIN': [
    'profile', 'users', 'products', 'pets', 'orders', 'appointments', 'categories', 'chat'
  ],
  'OWNER': [
    'profile', 'users', 'products', 'pets', 'orders', 'appointments', 'categories', 'system', 'stats', 'chat'
  ]
};

// Действия, доступные для каждой роли
const ROLE_ACTIONS = {
  'CLIENT': [
    // Профиль
    'view_profile', 'edit_profile',
    // Товары и питомцы
    'view_products', 'view_pets',
    // Заказы
    'create_order', 'view_own_orders', 'cancel_own_order',
    // Записи к ветеринару
    'book_appointment', 'view_own_appointments', 'cancel_own_appointment',
    // Чат
    'send_message', 'view_own_messages'
  ],
  'SELLER': [
    // Профиль
    'view_profile', 'edit_profile',
    // Товары
    'view_products', 'create_product', 'update_own_product', 'delete_own_product',
    // Питомцы
    'view_pets', 'create_pet', 'update_own_pet', 'delete_own_pet',
    // Продажи
    'view_own_sales',
    // Чат
    'send_message', 'view_own_messages'
  ],
  'VETERINARIAN': [
    // Профиль
    'view_profile', 'edit_profile',
    // Записи и питомцы
    'view_appointments', 'update_appointment', 'view_pets',
    // Чат
    'send_message', 'view_own_messages'
  ],
  'ADMIN': [
    // Профиль
    'view_profile', 'edit_profile',
    // Пользователи
    'view_all_users', 'update_user', 'delete_user',
    // Товары
    'view_products', 'create_product', 'update_any_product', 'delete_any_product',
    // Питомцы
    'view_pets', 'create_pet', 'update_any_pet', 'delete_any_pet',
    // Заказы
    'view_all_orders', 'update_any_order', 'cancel_any_order',
    // Записи
    'view_all_appointments', 'update_any_appointment', 'cancel_any_appointment',
    // Категории
    'manage_categories',
    // Чат
    'send_message', 'view_all_messages'
  ],
  'OWNER': [
    // Все права администратора
    'view_profile', 'edit_profile',
    'view_all_users', 'update_user', 'delete_user', 'manage_admins',
    'view_products', 'create_product', 'update_any_product', 'delete_any_product',
    'view_pets', 'create_pet', 'update_any_pet', 'delete_any_pet',
    'view_all_orders', 'update_any_order', 'cancel_any_order',
    'view_all_appointments', 'update_any_appointment', 'cancel_any_appointment',
    'manage_categories',
    'send_message', 'view_all_messages',
    // Дополнительные права владельца
    'configure_system', 'view_system_stats', 'manage_backups', 'export_data'
  ]
};

// Описания разделов интерфейса
const SECTION_DESCRIPTIONS = {
  'profile': 'Профиль пользователя',
  'products': 'Товары и продукты',
  'pets': 'Питомцы и животные',
  'orders': 'Заказы',
  'appointments': 'Записи к ветеринару',
  'users': 'Управление пользователями',
  'categories': 'Категории товаров и питомцев',
  'sales': 'Продажи и статистика',
  'system': 'Настройки системы',
  'stats': 'Аналитика и отчеты',
  'chat': 'Чат и сообщения'
};

// Описания действий
const ACTION_DESCRIPTIONS = {
  // Профиль
  'view_profile': 'Просмотр профиля',
  'edit_profile': 'Редактирование профиля',
  // Товары
  'view_products': 'Просмотр товаров',
  'create_product': 'Создание товара',
  'update_own_product': 'Редактирование своих товаров',
  'delete_own_product': 'Удаление своих товаров',
  'update_any_product': 'Редактирование любых товаров',
  'delete_any_product': 'Удаление любых товаров',
  // Питомцы
  'view_pets': 'Просмотр питомцев',
  'create_pet': 'Добавление питомца',
  'update_own_pet': 'Редактирование своих питомцев',
  'delete_own_pet': 'Удаление своих питомцев',
  'update_any_pet': 'Редактирование любых питомцев',
  'delete_any_pet': 'Удаление любых питомцев',
  // Заказы
  'create_order': 'Создание заказа',
  'view_own_orders': 'Просмотр своих заказов',
  'cancel_own_order': 'Отмена своих заказов',
  'view_all_orders': 'Просмотр всех заказов',
  'update_any_order': 'Редактирование любых заказов',
  'cancel_any_order': 'Отмена любых заказов',
  // Записи
  'book_appointment': 'Запись на прием',
  'view_own_appointments': 'Просмотр своих записей',
  'cancel_own_appointment': 'Отмена своих записей',
  'view_appointments': 'Просмотр записей (для ветеринара)',
  'update_appointment': 'Обновление статуса записи',
  'view_all_appointments': 'Просмотр всех записей',
  'update_any_appointment': 'Редактирование любых записей',
  'cancel_any_appointment': 'Отмена любых записей',
  // Пользователи
  'view_all_users': 'Просмотр всех пользователей',
  'update_user': 'Редактирование пользователей',
  'delete_user': 'Удаление пользователей',
  'manage_admins': 'Управление администраторами',
  // Категории
  'manage_categories': 'Управление категориями',
  // Продажи
  'view_own_sales': 'Просмотр своих продаж',
  // Система
  'configure_system': 'Настройка системы',
  'view_system_stats': 'Просмотр системной статистики',
  'manage_backups': 'Управление резервными копиями',
  'export_data': 'Экспорт данных',
  // Чат
  'send_message': 'Отправка сообщений',
  'view_own_messages': 'Просмотр своих сообщений',
  'view_all_messages': 'Просмотр всех сообщений'
};

export {
  ROLE_SECTIONS,
  ROLE_ACTIONS,
  SECTION_DESCRIPTIONS,
  ACTION_DESCRIPTIONS
};