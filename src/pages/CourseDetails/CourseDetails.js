import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaUserTie, FaClock } from "react-icons/fa";
import "./CourseDetails.css";

const CourseDetails = () => {
  const { courseId } = useParams(); // الحصول على معرف الكورس من الرابط
  const [course, setCourse] = useState(null); // بيانات الكورس
  const [loading, setLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // حالة الخطأ
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0); // الفيديو المحدد

  // Fetch course details from API
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`https://bsesa-backend.onrender.com/course/${courseId}`);
        setCourse(response.data.course);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch course data");
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handleVideoClick = (index) => {
    setSelectedVideoIndex(index);
  };

  const videosExist = course?.videos && course.videos.length > 0;

  if (loading) {
    return <div className="loading text-white bg-gray-900 h-screen flex items-center justify-center">Loading course details...</div>;
  }

  if (error) {
    return (
      <div className="course-error text-white bg-gray-900 h-screen flex items-center justify-center">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="course-not-found text-white bg-gray-900 h-screen flex items-center justify-center">
        <h2>Course Not Found</h2>
        <p>We couldn't find the course you're looking for. Please check the course ID or browse our available courses.</p>
      </div>
    );
  }

  return (
    <div className="course-details-page bg-gray-900 text-white min-h-screen p-6">
      <div className="course-details-header text-center">
        <img src={course.thumbnail} alt={course.title} className="course-details-thumbnail mx-auto rounded-md mb-4" />
        <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
        <p className="text-gray-300 mb-4">{course.description}</p>
        <div className="course-coach-info flex items-center justify-center gap-2 text-gray-400">
          <FaUserTie /> <span>{course.coach?.name || "Unknown"}</span>
        </div>
      </div>

      <div className="course-details-content flex gap-8 mt-8">
        <div className="course-details-sidebar bg-gray-800 p-4 rounded-md w-1/3">
          <h3 className="text-yellow-400 text-xl font-semibold mb-4">Course Videos</h3>
          {videosExist ? (
            <ul className="course-video-list space-y-2">
              {course.videos.map((video, index) => (
                <li
                  key={index}
                  className={`course-details-video-item flex items-center gap-2 p-2 rounded-md cursor-pointer ${
                    index === selectedVideoIndex ? "bg-yellow-400 text-gray-900" : "bg-gray-700 text-white"
                  }`}
                  onClick={() => handleVideoClick(index)}
                >
                  <FaClock /> <span>{video.video?.title || "Untitled Video"}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">Videos will be added soon.</p>
          )}
        </div>

        <div className="course-details-video bg-gray-800 p-4 rounded-md w-2/3">
          {videosExist ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">{course.videos[selectedVideoIndex].video?.title || "No Title"}</h2>
              {course.videos[selectedVideoIndex].video?.thumbnail && (
                <img
                  src={course.videos[selectedVideoIndex].video.thumbnail}
                  alt={course.videos[selectedVideoIndex].video.title}
                  className="details-video-thumbnail rounded-md mb-4 w-full"
                />
              )}
              <p className="text-gray-300">{course.videos[selectedVideoIndex].video?.description || "No description available."}</p>
            </>
          ) : (
            <p className="text-gray-400 text-center">Stay tuned for upcoming videos!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
