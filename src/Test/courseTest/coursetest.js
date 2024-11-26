import React, { useState, useEffect } from "react";
import axios from "axios";

const AddVideosToCourse = () => {
  const [courses, setCourses] = useState([]); // قائمة الكورسات
  const [selectedCourseId, setSelectedCourseId] = useState(null); // الكورس المختار
  const [videos, setVideos] = useState([]); // قائمة الفيديوهات
  const [selectedVideos, setSelectedVideos] = useState([]); // الفيديوهات المختارة مع ترتيبها
  const [message, setMessage] = useState(""); // الرسائل

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("https://bsesa-backend.onrender.com/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Fetch all videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("https://bsesa-backend.onrender.com/videos");
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  // Handle course selection
  const handleCourseSelect = (courseId) => {
    setSelectedCourseId(courseId);
    setSelectedVideos([]); // إعادة تعيين الفيديوهات المختارة
    setMessage(""); // إعادة تعيين الرسائل
  };

  // Handle video selection with order
  const handleVideoToggle = (video) => {
    const isSelected = selectedVideos.find((v) => v.videoId === video._id);

    if (isSelected) {
      // إذا كان الفيديو موجودًا، قم بإزالته
      setSelectedVideos((prevSelected) =>
        prevSelected.filter((v) => v.videoId !== video._id)
      );
    } else {
      // إذا لم يكن موجودًا، أضفه مع ترتيب جديد
      setSelectedVideos((prevSelected) => [
        ...prevSelected,
        { videoId: video._id, order: prevSelected.length + 1 },
      ]);
    }
  };

  // Update video order
  const updateVideoOrder = (videoId, newOrder) => {
    setSelectedVideos((prevSelected) =>
      prevSelected.map((v) =>
        v.videoId === videoId ? { ...v, order: newOrder } : v
      )
    );
  };

  // Add videos to course
  const handleAddVideos = async () => {
    if (!selectedCourseId) {
      setMessage("Please select a course first.");
      return;
    }
  
    try {
      // تجهيز قائمة معرّفات الفيديوهات فقط
      const videosToAdd = selectedVideos.map((v) => v.videoId);
  
      const response = await axios.put(
        `https://bsesa-backend.onrender.com/course/add_video/${selectedCourseId}`,
        { newVideos: videosToAdd } // إرسال المعرّفات فقط
      );
  
      setMessage("Videos added successfully!");
    } catch (error) {
      console.error("Error adding videos to course:", error);
      setMessage("Failed to add videos. Please try again.");
    }
  };

  return (
    <div className="add-videos-page bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Add Videos to Course</h1>

      {/* Select Course */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Select a Course</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className={`p-4 rounded-lg cursor-pointer shadow-md ${
                selectedCourseId === course._id
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-gray-800"
              }`}
              onClick={() => handleCourseSelect(course._id)}
            >
              <img
                src={course.thumbnail || "https://via.placeholder.com/300"}
                alt={course.title}
                className="rounded-md mb-4 w-full h-40 object-cover"
              />
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-gray-400">{course.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Select Videos */}
      {selectedCourseId && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Select Videos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video) => {
              const selectedVideo = selectedVideos.find(
                (v) => v.videoId === video._id
              );
              return (
                <div
                  key={video._id}
                  className={`p-4 rounded-lg cursor-pointer shadow-md ${
                    selectedVideo
                      ? "bg-yellow-400 text-gray-900"
                      : "bg-gray-800"
                  }`}
                >
                  <img
                    src={video.thumbnail || "https://via.placeholder.com/300"}
                    alt={video.title}
                    className="rounded-md mb-4 w-full h-40 object-cover"
                    onClick={() => handleVideoToggle(video)}
                  />
                  <h3 className="text-lg font-semibold text-center">
                    {video.title}
                  </h3>
                  {selectedVideo && (
                    <div className="mt-2 flex justify-between items-center">
                      <p className="text-sm text-gray-900 font-semibold">
                        Order: {selectedVideo.order}
                      </p>
                      <input
                        type="number"
                        min="1"
                        value={selectedVideo.order}
                        onChange={(e) =>
                          updateVideoOrder(video._id, parseInt(e.target.value))
                        }
                        className="w-16 p-1 text-gray-900 rounded"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Submit Button */}
      {selectedCourseId && (
        <button
          className="bg-yellow-500 text-gray-900 px-6 py-2 rounded hover:bg-yellow-600"
          onClick={handleAddVideos}
        >
          Add Videos
        </button>
      )}

      {/* Message */}
      {message && <p className="mt-4 text-yellow-400">{message}</p>}
    </div>
  );
};

export default AddVideosToCourse;
