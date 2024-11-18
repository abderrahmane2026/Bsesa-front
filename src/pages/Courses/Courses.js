import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";
import { FaVideo, FaDollarSign, FaUserTie } from "react-icons/fa";
import "./Courses.css";
import data from "./CoursesData.json";

function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const navigate = useNavigate();

  const scrollLeft = (ref) => {
    ref.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = (ref) => {
    ref.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const handleCardClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const categories = [...new Set(data.flatMap((course) => course.categorys))];

  const filteredCourses = data.filter((course) => {
    return (
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter ? course.categorys.includes(categoryFilter) : true)
    );
  });

  return (
    <div className="courses-section-container">
      <h2>Explore Our Courses</h2>

      <div className="search-filter-section">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {categories.map((category) => {
        const containerRef = React.createRef();
        const categoryCourses = filteredCourses.filter((course) => course.categorys.includes(category));

        if (categoryCourses.length === 0) {
          return null;
        }

        return (
          <div className="category-section" key={category}>
            <h3 className="category-title">{category}</h3>
            <div className="courses-section-wrapper">
              <button onClick={() => scrollLeft(containerRef)} className="scroll-button">
                <HiArrowCircleLeft />
              </button>
              <div className="courses-section" ref={containerRef}>
                {categoryCourses.map((course) => (
                  <div
                    className="course-card"
                    key={course._id}
                    onClick={() => handleCardClick(course._id)}
                  >
                    <div className="course-image">
                      <img
                        src={course.thumbnail || "https://via.placeholder.com/200"}
                        alt={course.title}
                        className="course-thumbnail"
                      />
                    </div>
                    <div className="course-info">
                      <h4>{course.title}</h4>
                      <p>
                        <FaUserTie /> Coach: {course.coach?.name || "Unknown"}
                      </p>
                      <p>
                        <FaVideo /> Videos: {course.videos.length}
                      </p>
                      <p>
                        <FaDollarSign /> Price: ${course.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollRight(containerRef)} className="scroll-button">
                <HiArrowCircleRight />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Courses;
