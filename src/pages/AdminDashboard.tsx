
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import Dashboard from '../components/admin/Dashboard';
import ServiceProviders from '../components/admin/ServiceProviders';
import Customers from '../components/admin/Customers';
import Bookings from '../components/admin/Bookings';
import Payments from '../components/admin/Payments';
import Reviews from '../components/admin/Reviews';
import Categories from '../components/admin/Categories';
import Notifications from '../components/admin/Notifications';
import AdminProfile from '../components/admin/AdminProfile';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/providers" element={<ServiceProviders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<AdminProfile />} />
        <Route path="/settings" element={<AdminProfile />} />
        <Route path="/change-password" element={<AdminProfile />} />
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;
