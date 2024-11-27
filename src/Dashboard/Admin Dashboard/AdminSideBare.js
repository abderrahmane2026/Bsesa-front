// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Sidebar.css';  // للـ CSS الخاص بالشريط الجانبي

const Sidebar = () => {
  return (
    <div className="sidebar bg-dark text-white p-4">
      <h3 className="text-center">Admin Dashboard</h3>
      <ul className="list-unstyled">
        <li>
          <Link to="/admin/NewQuiz" className="text-light">
            <Button variant="outline-light" className="w-100 mb-3">
              Create New Quiz
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/admin/NewBlog" className="text-light">
            <Button variant="outline-light" className="w-100 mb-3">
              Create New Blog
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/admin/NewCourse" className="text-light">
            <Button variant="outline-light" className="w-100 mb-3">
              Create New Course
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/admin/NewConference" className="text-light">
            <Button variant="outline-light" className="w-100 mb-3">
              Create New Conference
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/admin/create-category" className="text-light">
            <Button variant="outline-light" className="w-100 mb-3">
              Create New Category
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/admin/create-video" className="text-light">
            <Button variant="outline-light" className="w-100 mb-3">
              Create New Video
            </Button>
          </Link>
        </li>
        <li>
          <Link to="/admin/AddVideotest" className="text-light">
            <Button variant="outline-light" className="w-100 mb-3">
              Add Video Test
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
