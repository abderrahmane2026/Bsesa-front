import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";
import { FaVideo, FaDollarSign, FaUserTie } from "react-icons/fa";
import "./CourseSection.css";
import data from "../../pages/Courses/CoursesData.json";

function CoursesSection() {
  const [courses, setCourses] = useState(data);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const handleCardClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  const filteredCourses = courses.filter((course) => {
    return (
     
      (categoryFilter ? course.categorys.includes(categoryFilter) : true)
    );
  });

  return (
    <div className="courses-section-container">
         <div className='relative max-w-xl mx-auto sm:text-center'>
                    <h1 className="text-gray-800 mb-20 font-bold text-4xl xl:text-5xl">
                    Explore Our
                        <span className="text-indigo-600"> Courses</span>
                    </h1>
                </div>
    

      <div className="search-filter-section">
       
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Categories</option>
          {[...new Set(data.flatMap((course) => course.categorys))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="courses-section-wrapper">
        <button onClick={scrollLeft} className="scroll-button">
          <HiArrowCircleLeft />
        </button>
        <div className="courses-section" ref={containerRef}>
          {filteredCourses.map((course) => (
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
        <button onClick={scrollRight} className="scroll-button">
          <HiArrowCircleRight />
        </button>
      </div>
    </div>
  );
}

export default CoursesSection;
