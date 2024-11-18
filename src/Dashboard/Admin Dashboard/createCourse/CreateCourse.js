import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateCourse.css";

const NewCourse = () => {
  const [title, setTitle] = useState("");
  const [categorys, setCategorys] = useState("");
  const [coach, setCoach] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [videos, setVideos] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [allVideos, setAllVideos] = useState([]);
  const [page, setPage] = useState(1); // صفحة الفيديوهات الحالية
  const [message, setMessage] = useState("");

  // جلب معرف المستخدم الحالي كمدرب من LocalStorage
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const currentUserId = currentUser ? currentUser.id : null;
    setCoach(currentUserId);
  }, []);

  // جلب قائمة الفيديوهات عند تغيير الصفحة
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/videos", {
          params: { page, NumberVideos: 10 },
        });
        setAllVideos(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, [page]);

  const handleVideoChange = (index, field, value) => {
    const updatedVideos = [...videos];
    updatedVideos[index] = { ...updatedVideos[index], [field]: value };
    setVideos(updatedVideos);
  };

  const handleAddVideo = () => {
    setVideos([...videos, { video: "", order: "" }]);
  };

  const handleFileChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("categorys", JSON.stringify(categorys.split(",")));
    formData.append("coach", coach);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("thumbnail", thumbnail);
    formData.append("videos", JSON.stringify(videos));

    try {
      const response = await axios.post("http://localhost:5000/course/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Course created successfully!");
      setTitle("");
      setCategorys("");
      setDescription("");
      setPrice("");
      setVideos([]);
      setThumbnail(null);
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.err}`);
    }
  };

  return (
    <div className="course-page">
      <div className="new-course-container">
        <h1>Create New Course</h1>
        <form onSubmit={handleSubmit} className="new-course-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Category (comma-separated)</label>
            <input
              type="text"
              value={categorys}
              onChange={(e) => setCategorys(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Thumbnail Image</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <div className="form-group">
            <label>Videos</label>
            {videos.map((video, index) => (
              <div key={index} className="video-group">
                <select
                  value={video.video}
                  onChange={(e) => handleVideoChange(index, "video", e.target.value)}
                  required
                >
                  <option value="">Select a video</option>
                  {allVideos.map((v) => (
                    <option key={v._id} value={v._id}>
                      {v.title}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  name="order"
                  placeholder="Order"
                  value={video.order}
                  onChange={(e) => handleVideoChange(index, "order", e.target.value)}
                />
              </div>
            ))}
            <button type="button" onClick={handleAddVideo} className="add-video-button">
              Add Video
            </button>
          </div>

          {/* التنقل بين الصفحات */}
          <div className="pagination">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>Page {page}</span>
            <button
              type="button"
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>

          <button type="submit" className="submit-button">Create Course</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default NewCourse;
