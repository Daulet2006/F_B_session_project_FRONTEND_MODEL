import React from 'react';
import { Link } from 'react-router-dom';

// Admin navigation links
export const AdminNavLinks = () => (
  <>
    <li><Link to="/admin/dashboard" className="hover:text-green-200">Dashboard</Link></li>
    <li><Link to="/admin/users" className="hover:text-green-200">Users</Link></li>
    <li><Link to="/admin/pets" className="hover:text-green-200">Pets</Link></li>
    <li><Link to="/admin/products" className="hover:text-green-200">Products</Link></li>
    <li><Link to="/admin/appointments" className="hover:text-green-200">Appointments</Link></li>
  </>
);

// Seller navigation links
export const SellerNavLinks = () => (
  <>
    <li><Link to="/seller/dashboard" className="hover:text-green-200">Dashboard</Link></li>
    <li><Link to="/seller/pets" className="hover:text-green-200">My Pets</Link></li>
    <li><Link to="/seller/products" className="hover:text-green-200">My Products</Link></li>
    <li><Link to="/seller/sales" className="hover:text-green-200">Sales</Link></li>
  </>
);

// Customer navigation links
export const CustomerNavLinks = () => (
  <>
    <li><Link to="/" className="hover:text-green-200">Home</Link></li>
    <li><Link to="/pets" className="hover:text-green-200">Pets</Link></li>
    <li><Link to="/products" className="hover:text-green-200">Products</Link></li>
    <li><Link to="/my-appointments" className="hover:text-green-200">My Appointments</Link></li>
    <li><Link to="/my-purchases" className="hover:text-green-200">My Purchases</Link></li>
  </>
);

// Vet navigation links
export const VetNavLinks = () => (
  <>
    <li><Link to="/vet/dashboard" className="hover:text-green-200">Dashboard</Link></li>
    <li><Link to="/vet/appointments" className="hover:text-green-200">Appointments</Link></li>
    <li><Link to="/vet/patients" className="hover:text-green-200">Patients</Link></li>
    <li><Link to="/vet/schedule" className="hover:text-green-200">Schedule</Link></li>
  </>
);