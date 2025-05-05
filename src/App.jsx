// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Animals from "./pages/Animals";
import Vets from "./pages/Vets";
import NavBar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UsersManagement from "./pages/UsersManagement";
import Footer from "./components/Footer";
import MyOrders from "./pages/MyOrders";
import Cart from "./pages/Cart";
import MyAppointments from "./pages/MyAppointments";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile"; // Import the new Profile page
import RoleBasedInterface from "./components/RoleBasedInterface";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import { fetchUserPermissionsThunk } from "./redux/permissionSlice";

function App() {
  const dispatch = useDispatch();
  const { user, token } = useSelector(state => state.auth || {});
  
  // Загружаем разрешения пользователя при входе в систему
  useEffect(() => {
    if (user && token) {
      dispatch(fetchUserPermissionsThunk());
    }
  }, [dispatch, user, token]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <main className="flex-grow">
          <Routes>
            {/* Публичные маршруты */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/vets" element={<Vets />} />

            {/* Protected Routes - Require Authentication */}
            <Route element={<RoleProtectedRoute />}> {/* Base protection: Must be logged in */}
              <Route path="/profile" element={<Profile />} /> {/* User profile page */}
              <Route path="/cart" element={<Cart />} />
            </Route>

            {/* Маршруты с проверкой доступа к разделу/действию */}
            <Route path="/products" element={
              <RoleBasedInterface requiredSection="products" showAccessDenied={true}>
                <Products />
              </RoleBasedInterface>
            } />
            
            <Route path="/animals" element={
              <RoleBasedInterface requiredSection="pets" showAccessDenied={true}>
                <Animals />
              </RoleBasedInterface>
            } />

            {/* Protected Routes with Specific Permissions */}
            {/* Note: requiredAction should match keys in ROLE_PERMISSIONS.js */}
            <Route element={<RoleProtectedRoute requiredSection="orders" requiredAction="view_own_orders" />}>
              <Route path="/my-orders" element={<MyOrders />} />
            </Route>

            {/* Cart is usually accessible to logged-in users, moved to general protected routes above */}

            <Route element={<RoleProtectedRoute requiredSection="appointments" requiredAction="view_own_appointments" />}>
              <Route path="/my-appointments" element={<MyAppointments />} />
            </Route>

            <Route element={<RoleProtectedRoute requiredSection="chat" requiredAction="use_chat" />}>
              <Route path="/chat" element={<Chat />} />
            </Route>

            {/* Users Management - Requires OWNER role (enforced within the component) */}
            {/* RoleProtectedRoute here just ensures the user is logged in */}
            <Route element={<RoleProtectedRoute />}>
              <Route path="/users" element={<UsersManagement />} />
            </Route>

            {/* Dashboard might need role-specific protection if content varies significantly */}
            {/* Currently accessible to all logged-in users via the '/' route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;