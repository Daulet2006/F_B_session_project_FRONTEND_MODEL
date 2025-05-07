// src/app.js
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// Components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProductList from "./components/products/ProductList";
import ProductDetail from "./components/products/ProductDetail";
import ProductForm from "./components/products/ProductForm";
import PetList from "./components/pets/PetList";
import PetDetail from "./components/pets/PetDetail";
import PetForm from "./components/pets/PetForm";
import UserList from "./components/users/UserList";
import UserForm from "./components/users/UserForm";
import OrderList from "./components/orders/OrderList";
import OrderDetail from "./components/orders/OrderDetail";
import AppointmentList from "./components/appointments/AppointmentList";
import AppointmentDetail from "./components/appointments/AppointmentDetail";
import AppointmentForm from "./components/appointments/AppointmentForm";
import NotFound from "./components/layout/NotFound";
import Chat from "./components/chat/Chat";

// Redux
import { checkAuth } from "./redux/slices/authSlice";

// Protected Route Component
const ProtectedRoute = ({ element, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role.toLowerCase())) {
    return <Navigate to="/dashboard" />;
  }

  return element;
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/chat" element={<ProtectedRoute element={<Chat />} />} />

            {/* Product Routes */}
            <Route path="/products" element={<ProtectedRoute element={<ProductList />} />} />
            <Route path="/products/:id" element={<ProtectedRoute element={<ProductDetail />} />} />
            <Route
              path="/products/add"
              element={<ProtectedRoute element={<ProductForm />} allowedRoles={["admin", "seller"]} />}
            />
            <Route
              path="/products/edit/:id"
              element={<ProtectedRoute element={<ProductForm />} allowedRoles={["admin", "seller"]} />}
            />

            {/* Pet Routes */}
            <Route path="/pets" element={<ProtectedRoute element={<PetList />} />} />
            <Route path="/pets/:id" element={<ProtectedRoute element={<PetDetail />} />} />
            <Route
              path="/pets/add"
              element={<ProtectedRoute element={<PetForm />} allowedRoles={["admin", "seller"]} />}
            />
            <Route
              path="/pets/edit/:id"
              element={<ProtectedRoute element={<PetForm />} allowedRoles={["admin", "seller"]} />}
            />

            {/* User Routes */}
            <Route path="/users" element={<ProtectedRoute element={<UserList />} allowedRoles={["admin"]} />} />
            <Route path="/users/add" element={<ProtectedRoute element={<UserForm />} allowedRoles={["admin"]} />} />
            <Route
              path="/users/edit/:id"
              element={<ProtectedRoute element={<UserForm />} allowedRoles={["admin"]} />}
            />

            {/* Order Routes */}
            <Route path="/orders" element={<ProtectedRoute element={<OrderList />} />} />
            <Route path="/orders/:id" element={<ProtectedRoute element={<OrderDetail />} />} />

            {/* Appointment Routes */}
            <Route path="/appointments" element={<ProtectedRoute element={<AppointmentList />} />} />
            <Route path="/appointments/:id" element={<ProtectedRoute element={<AppointmentDetail />} />} />
            <Route
              path="/appointments/add"
              element={<ProtectedRoute element={<AppointmentForm />} allowedRoles={["admin", "seller", "client"]} />}
            />
            <Route
              path="/appointments/edit/:id"
              element={<ProtectedRoute element={<AppointmentForm />} allowedRoles={["admin", "seller"]} />}
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer position="bottom-right" />
      </div>
    </Router>
  );
}

export default App;