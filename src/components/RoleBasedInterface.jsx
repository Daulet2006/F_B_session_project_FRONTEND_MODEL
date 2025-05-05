// src/components/RoleBasedInterface.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCanAccessSection, selectCanPerformAction } from '../redux/permissionSlice';
import AccessDenied from './AccessDenied';


const RoleBasedInterface = ({ 
  requiredSection, 
  requiredAction, 
  children, 
  fallback = null,
  showIfNotAuthenticated = false,
  showAccessDenied = false
 }) => {
  const { user } = useSelector(state => state.auth || {});
  const { loading: permissionsLoading } = useSelector(state => state.permissions || {});
  
  // Используем селекторы для проверки доступа к разделу и действию
  const canAccessSection = useSelector(state => 
    requiredSection ? selectCanAccessSection(state, requiredSection) : true
  );
  const canPerformAction = useSelector(state => 
    requiredAction ? selectCanPerformAction(state, requiredAction) : true
  );

  // Если разрешения загружаются, показываем индикатор загрузки или ничего
  if (permissionsLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-800"></div>
      </div>
    );
  }

  // Если пользователь не авторизован
  if (!user) {
    // Если требуется доступ к защищенному разделу или действию и не разрешено показывать для неаутентифицированных
    if ((requiredSection || requiredAction) && !showIfNotAuthenticated) {
      // Если нужно показать компонент AccessDenied
      if (showAccessDenied) {
        return <AccessDenied requiredSection={requiredSection} requiredAction={requiredAction} />;
      }
      return fallback;
    }
    // Если разрешено показывать для неаутентифицированных или не требуется доступ
    return <>{children}</>;
  }

  // Проверяем доступ к разделу и действию для авторизованного пользователя
  if (canAccessSection && canPerformAction) {
    return <>{children}</>;
  }

  // Если доступа нет, возвращаем AccessDenied или fallback
  if (showAccessDenied) {
    return <AccessDenied requiredSection={requiredSection} requiredAction={requiredAction} />;
  }
  
  return fallback;
};

export default RoleBasedInterface;