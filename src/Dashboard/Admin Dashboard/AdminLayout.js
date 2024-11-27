// AdminLayout.js
import React from 'react';

import { Outlet } from 'react-router-dom';
import './AdminLayout.css';  // ستايل للـ Layout
import Sidebar from './AdminSideBare';

const AdminLayout = () => {
  return (
    <div className="admin-layout d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="main-content flex-grow-1 p-4">
        <Outlet />  {/* يتم هنا عرض المحتوى الخاص بالصفحة المختارة */}
      </div>
    </div>
  );
};

export default AdminLayout;
