import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from '../features/auth/LoginPage';
import HomePage from '../pages/HomePage';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
