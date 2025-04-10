// src/routes/AppRouter.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import HomePage from "../pages/HomePage";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import PetList from "../pages/PetList";
import AddPetForm from "../components/AddPetForm";
import ProtectedRoute from "../components/ProtectedRoute";
import ProductList from "../pages/ProductList";
import AddProductForm from "../components/AddProductForm";
import AppointmentList from "../pages/AppointmentList";
import CreateAppointmentForm from "../components/CreateAppointmentForm";
import Navbar from "../components/Navbar";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets"
          element={
            <ProtectedRoute>
              <PetList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pets/add"
          element={
            <ProtectedRoute>
              <AddPetForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute requiredRole="admin">
              <AppointmentList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments/create"
          element={
            <ProtectedRoute>
              <CreateAppointmentForm />
            </ProtectedRoute>
          }
        />
        {/* Admin Product Routes */}
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute requiredRole="admin">
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products/add"
          element={
            <ProtectedRoute requiredRole="admin">
              <AddProductForm />
            </ProtectedRoute>
          }
        />

        {/* Seller Product Routes */}
        <Route
          path="/seller/products"
          element={
            <ProtectedRoute requiredRole="seller">
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/products/add"
          element={
            <ProtectedRoute requiredRole="seller">
              <AddProductForm />
            </ProtectedRoute>
          }
        />

        {/* Vet Product Routes */}
        <Route
          path="/vet/products"
          element={
            <ProtectedRoute requiredRole="vet">
              <ProductList />
            </ProtectedRoute>
          }
        />

        {/* Customer Product Routes */}
        <Route
          path="/products"
          element={
            <ProtectedRoute requiredRole="customer">
              <ProductList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
