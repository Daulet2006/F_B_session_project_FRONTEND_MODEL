// src/components/Navbar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { selectCartTotalItems } from '../redux/cartSlice'; // Импорт селектора для количества товаров в корзине
import RoleBasedNavigation from './RoleBasedNavigation'; // Импортируем компонент ролевой навигации
import RoleBasedInterface from './RoleBasedInterface'; // Импортируем компонент ролевого интерфейса

export default function NavBar() {
  const { user } = useSelector((state) => state.auth);
  const totalCartItems = useSelector(selectCartTotalItems); // Получаем количество товаров в корзине
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-green-800 shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <NavLink to="/" className="text-2xl font-bold text-white hover:text-gray-200">
            ЗооМагазин
          </NavLink>
          {user && (
            <div className="ml-4 px-2 py-1 bg-green-700 rounded-md text-white text-xs">
              {user.role}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Главная страница - доступна всем */}
          <NavLink to="/" className={({ isActive }) => 
            `text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-green-700' : ''}`
          }>
            Главная
          </NavLink>
          
          {/* Используем компонент ролевой навигации для отображения ссылок в зависимости от роли */}
          <RoleBasedNavigation />
          
          {/* Ссылка на корзину - доступна пользователям с правами на просмотр заказов */}
          <RoleBasedInterface requiredSection="orders">
            <NavLink to="/cart" className={({ isActive }) => 
              `relative text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-green-700' : ''}`
            }>
              Корзина
              {totalCartItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                  {totalCartItems}
                </span>
              )}
            </NavLink>
          </RoleBasedInterface>
          
          {/* Панель администратора - только для админов и владельцев */}
          <RoleBasedInterface requiredSection="users">
            <NavLink to="/dashboard" className={({ isActive }) => 
              `text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-green-700' : ''}`
            }>
              Панель управления
            </NavLink>
          </RoleBasedInterface>
          
          {/* Кнопка выхода - только для авторизованных пользователей */}
          {user && (
            <button 
              onClick={handleLogout} 
              className="text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Выйти
            </button>
          )}
          
          {/* Ссылки на вход и регистрацию - только для неавторизованных пользователей */}
          {!user && (
            <>
              <NavLink to="/login" className={({ isActive }) => 
                `text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-green-700' : ''}`
              }>
                Войти
              </NavLink>
              <NavLink to="/register" className={({ isActive }) => 
                `text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-green-700' : ''}`
              }>
                Регистрация
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
