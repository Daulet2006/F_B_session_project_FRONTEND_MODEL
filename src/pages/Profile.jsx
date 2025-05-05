// src/pages/Profile.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import RoleBadge from '../components/RoleBadge';

const Profile = () => {
  const user = useSelector(state => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Мой профиль</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Имя пользователя:
          </label>
          <p className="text-gray-700 text-base">{user.username}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <p className="text-gray-700 text-base">{user.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Роль:
          </label>
          <RoleBadge role={user.role} />
        </div>
      </div>
    </div>
  );
};

export default Profile;