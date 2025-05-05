// Файл: src/pages/Dashboard.jsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVetsThunk } from '../redux/vetSlice';
import { fetchProductsThunk } from '../redux/productSlice';
import { fetchAnimalsThunk } from '../redux/animalSlice';
import { fetchUserPermissionsThunk } from '../redux/permissionSlice';
import RoleSelector from '../components/RoleSelector';
import RoleBadge from '../components/RoleBadge';
import RoleBasedInterface from '../components/RoleBasedInterface';
import RoleDashboard from '../components/RoleDashboard';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items: vets, loading: vetsLoading, error: vetsError } = useSelector((state) => state.vets);
  const { items: products, loading: productsLoading, error: productsError } = useSelector((state) => state.products);
  const { items: animals, loading: animalsLoading, error: animalsError } = useSelector((state) => state.animals);
  const { user } = useSelector(state => state.auth || {});

  useEffect(() => {
    dispatch(fetchVetsThunk());
    dispatch(fetchProductsThunk());
    dispatch(fetchAnimalsThunk());
    dispatch(fetchUserPermissionsThunk());
  }, [dispatch]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">Панель управления</h1>
      
      {/* Summary Section */}
      <section className="mb-8 bg-white rounded-xl p-5 shadow-lg border-2 border-gray-200">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Обзор</h2>
        {vetsLoading && <p className="text-gray-600">Загрузка ветеринаров...</p>}
        {vetsError && <p className="text-red-500">Ошибка ветеринаров: {vetsError}</p>}
        {!vetsLoading && !vetsError && <p className="text-gray-600">Количество ветеринаров: {vets.length}</p>}
        
        {productsLoading && <p className="text-gray-600">Загрузка товаров...</p>}
        {productsError && <p className="text-red-500">Ошибка товаров: {productsError}</p>}
        {!productsLoading && !productsError && <p className="text-gray-600">Количество товаров: {products.length}</p>}
        
        {animalsLoading && <p className="text-gray-600">Загрузка животных...</p>}
        {animalsError && <p className="text-red-500">Ошибка животных: {animalsError}</p>}
        {!animalsLoading && !animalsError && <p className="text-gray-600">Количество животных: {animals.length}</p>}
      </section>
      
      {user && (
        <section className="mb-8 bg-white rounded-xl p-5 shadow-lg border-2 border-gray-200">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Информация о пользователе</h2>
          <div className="flex items-center mb-4">
            <span className="font-medium mr-2">Имя пользователя:</span>
            <span>{user.username}</span>
          </div>
          <div className="flex items-center mb-4">
            <span className="font-medium mr-2">Роль:</span>
            <RoleBadge role={user.role} />
          </div>
          
          <RoleSelector />
        </section>
      )}
      
      <RoleDashboard />

      <RoleBasedInterface requiredSection="users" requiredAction="view_all_users">
        <section className="mb-8 bg-white rounded-xl p-5 shadow-lg border-2 border-gray-200">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Управление пользователями</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/users" className="bg-green-700 text-white p-4 rounded-lg flex items-center justify-between hover:bg-green-800 transition-all">
              <span>Пользователи</span>
              <i className="fas fa-users"></i>
            </Link>
            <RoleBasedInterface requiredAction="manage_admins">
              <Link to="/admins" className="bg-purple-700 text-white p-4 rounded-lg flex items-center justify-between hover:bg-purple-800 transition-all">
                <span>Управление администраторами</span>
                <i className="fas fa-user-shield"></i>
              </Link>
            </RoleBasedInterface>
          </div>
        </section>
      </RoleBasedInterface>

      <RoleBasedInterface requiredSection="products" requiredAction="create_product">
        <section className="mb-8 bg-white rounded-xl p-5 shadow-lg border-2 border-gray-200">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Управление товарами и питомцами</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/products/manage" className="bg-blue-600 text-white p-4 rounded-lg flex items-center justify-between hover:bg-blue-700 transition-all">
              <span>Управление товарами</span>
              <i className="fas fa-box"></i>
            </Link>
            <Link to="/animals/manage" className="bg-amber-600 text-white p-4 rounded-lg flex items-center justify-between hover:bg-amber-700 transition-all">
              <span>Управление питомцами</span>
              <i className="fas fa-paw"></i>
            </Link>
            <RoleBasedInterface requiredSection="categories" requiredAction="manage_categories">
              <Link to="/categories" className="bg-teal-600 text-white p-4 rounded-lg flex items-center justify-between hover:bg-teal-700 transition-all">
                <span>Управление категориями</span>
                <i className="fas fa-tags"></i>
              </Link>
            </RoleBasedInterface>
          </div>
        </section>
      </RoleBasedInterface>

      <RoleBasedInterface requiredSection="appointments" requiredAction="update_appointment">
        <section className="mb-8 bg-white rounded-xl p-5 shadow-lg border-2 border-gray-200">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Управление приемами</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link to="/appointments/manage" className="bg-indigo-600 text-white p-4 rounded-lg flex items-center justify-between hover:bg-indigo-700 transition-all">
              <span>Мои приемы</span>
              <i className="fas fa-calendar-alt"></i>
            </Link>
            <Link to="/pets/appointments" className="bg-pink-600 text-white p-4 rounded-lg flex items-center justify-between hover:bg-pink-700 transition-all">
              <span>Питомцы на приеме</span>
              <i className="fas fa-paw"></i>
            </Link>
          </div>
        </section>
      </RoleBasedInterface>

      <RoleBasedInterface requiredSection="system" requiredAction="configure_system">
        <section className="mb-8 bg-white rounded-xl p-5 shadow-lg border-2 border-gray-200">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Управление платформой</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/system/settings" className="bg-gray-700 text-white p-4 rounded-lg flex items-center justify-between hover:bg-gray-800 transition-all">
              <span>Настройки платформы</span>
              <i className="fas fa-cogs"></i>
            </Link>
            <Link to="/stats" className="bg-green-600 text-white p-4 rounded-lg flex items-center justify-between hover:bg-green-700 transition-all">
              <span>Аналитика и отчеты</span>
              <i className="fas fa-chart-bar"></i>
            </Link>
            <Link to="/system/backup" className="bg-red-600 text-white p-4 rounded-lg flex items-center justify-between hover:bg-red-700 transition-all">
              <span>Резервное копирование</span>
              <i className="fas fa-database"></i>
            </Link>
          </div>
        </section>
      </RoleBasedInterface>

      <RoleBasedInterface>
        <section className="mb-8 bg-white rounded-xl p-5 shadow-lg border-2 border-gray-200">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Быстрый доступ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/products" className="bg-green-600 text-white p-4 rounded-lg flex items-center justify-between hover:bg-green-700 transition-all">
              <span>Каталог товаров</span>
              <i className="fas fa-box"></i>
            </Link>
            <Link to="/animals" className="bg-green-600 text-white p-4 rounded-lg flex items-center justify-between hover:bg-green-700 transition-all">
              <span>Каталог питомцев</span>
              <i className="fas fa-paw"></i>
            </Link>
            <Link to="/chat" className="bg-green-600 text-white p-4 rounded-lg flex items-center justify-between hover:bg-green-700 transition-all">
              <span>Чат поддержки</span>
              <i className="fas fa-comments"></i>
            </Link>
          </div>
        </section>
      </RoleBasedInterface>
    </div>
  );
}