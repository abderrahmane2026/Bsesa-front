import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './UserDashboard.css';

export default function UserDashboard() {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h3> </h3>
        <nav>
          <ul>
            <li><Link to="profile">ملفي الشخصي</Link></li>
            <li><Link to="orders">طلباتي</Link></li>
            <li><Link to="settings">الإعدادات</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}
