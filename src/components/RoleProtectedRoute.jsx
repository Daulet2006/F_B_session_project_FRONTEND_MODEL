// src/components/RoleProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCanAccessSection, selectCanPerformAction } from '../redux/permissionSlice';
import AccessDenied from './AccessDenied';


const RoleProtectedRoute = ({ 
  requiredSection, 
  requiredAction, 
  redirectToLogin = false
}) => {
  const { user } = useSelector(state => state.auth || {});
  const { loading: permissionsLoading } = useSelector(state => state.permissions || {});
  const canAccessSection = useSelector(state => 
    requiredSection ? selectCanAccessSection(state, requiredSection) : true
  );
  const canPerformAction = useSelector(state => 
    requiredAction ? selectCanPerformAction(state, requiredAction) : true
  );

  if (!user) {
    return redirectToLogin ? <Navigate to="/login" replace /> : <AccessDenied requiredSection={requiredSection} requiredAction={requiredAction} />;
  }

  // Use selectors to check access to the section and action
  if (permissionsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
      </div>
    );
  }

  // If the user is not authorized or lacks access, show the AccessDenied component
  if (!canAccessSection || !canPerformAction) {
    return <AccessDenied requiredSection={requiredSection} requiredAction={requiredAction} />;
  }

  // If the user is authorized and has access, render child routes
  return <Outlet />;
};

export default RoleProtectedRoute;