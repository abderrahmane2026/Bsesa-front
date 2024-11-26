import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";
import { FaVideo, FaDollarSign, FaTags } from "react-icons/fa";
import axios from "axios";
import "./CourseSection.css";

function CoursesSection() {
  const [courses, setCourses] = useState([]); // قائمة الكورسات
  const [categoryFilter, setCategoryFilter] = useState(""); // تصفية حسب الفئة
  const containerRef = useRef(null); // مرجع للتمرير الأفقي
  const navigate = useNavigate(); // للتنقل إلى صفحة الكورس

  // Fetch courses from API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Scroll left
  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  // Scroll right
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Navigate to course details
  const handleCardClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  // Filtered courses based on selected category
  const filteredCourses = courses.filter((course) =>
    categoryFilter ? course.categorys.includes(categoryFilter) : true
  );

  return (
    <div className="courses-section-container py-24 px-6 lg:px-16 bg-[#1A1A1A]">
      <div className="relative max-w-xl mx-auto sm:text-center">
        <h1 className="text-white mb-8 font-bold text-4xl xl:text-5xl">
          Explore Our
          <span className="text-yellow-400"> Courses</span>
        </h1>
        {/* النص الوصفي الذي طلبت إضافته */}
        <p className="text-gray-300 text-lg mt-4">
          The British Academy for Mathematics and Technology offers a wide range
          of distinctive and practical educational courses in various applied
          training fields. These courses are delivered through recorded lectures
          by expert and distinguished instructors in different mathematical
          disciplines.
        </p>
      </div>

      {/* Courses Display */}
      <div className="courses-section-wrapper flex items-center gap-5 mt-12">
        <button onClick={scrollLeft} className="scroll-button">
          <HiArrowCircleLeft />
        </button>
        <div
          className="courses-section flex gap-6 overflow-x-scroll scrollbar-hide"
          ref={containerRef}
        >
          {filteredCourses.map((course) => (
            <div
              className="bg-[#222222] p-6 rounded-lg cursor-pointer transition-transform ease-in-out duration-300 shadow-md hover:transform hover:-translate-y-2 hover:shadow-2xl w-[22rem] flex-shrink-0"
              key={course._id}
              onClick={() => handleCardClick(course._id)}
            >
              <div className="course-image mb-4">
                <img
                  src={course.thumbnail || "https://via.placeholder.com/200"}
                  alt={course.title}
                  className="course-thumbnail w-full h-48 object-cover rounded-md transition-transform ease-in-out duration-300 hover:scale-105"
                />
              </div>
              <div className="course-info">
                <h4 className="text-white mb-2 text-2xl font-semibold">
                  {course.title}
                </h4>
                <p className="text-gray-300 mb-1 flex items-center gap-1 text-sm">
                  <FaTags /> Last Update: {course.updatedAt}
                </p>
                <p className="text-gray-300 mb-1 flex items-center gap-1 text-sm">
                  <FaVideo /> Videos: {course.videos.length}
                </p>
                <p className="text-gray-300 mb-1 flex items-center gap-1 text-sm">
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
