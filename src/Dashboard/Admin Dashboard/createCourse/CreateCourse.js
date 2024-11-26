import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const [title, setTitle] = useState("");
  const [categorys, setCategorys] = useState([]); // الفئات المختارة
  const [categories, setCategories] = useState([]); // قائمة الفئات المسترجعة
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [published, setPublished] = useState(false); // جديد: حالة الكورس
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // لاستخدام التنقل بين الصفحات

  // جلب قائمة الفئات
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://bsesa-backend.onrender.com/categories");
        setCategories(response.data.categorys); // تخزين الفئات
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("categorys", JSON.stringify(categorys));
    formData.append("description", description);
    formData.append("price", price);
    formData.append("thumbnail", thumbnail);
    formData.append("published", published); // إرسال قيمة الحقل "published"

    try {
      const response = await axios.post("https://bsesa-backend.onrender.com/course/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const courseId = response.data.course._id; // استرجاع معرف الكورس
      setMessage("Course created successfully!");
      navigate(`/add-videos/${courseId}`); // التوجه إلى صفحة إضافة الفيديوهات
    } catch (error) {
      setMessage(`Error: ${error.response?.data?.err}`);
    }
  };

  return (
    <div className="course-page bg-gray-900 text-white min-h-screen">
      <div className="new-course-container max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Create New Course</h1>
        <form onSubmit={handleSubmit} className="new-course-form space-y-4">
          <div className="form-group">
            <label className="block text-lg mb-2">Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="block text-lg mb-2">Category</label>
            <select
              multiple
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
              value={categorys}
              onChange={(e) =>
                setCategorys([...e.target.selectedOptions].map((option) => option.value))
              }
              required
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="block text-lg mb-2">Description</label>
            <textarea
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="block text-lg mb-2">Price</label>
            <input
              type="number"
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="block text-lg mb-2">Thumbnail Image</label>
            <input
              type="file"
              className="w-full text-gray-300"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </div>
          <div className="form-group">
            <label className="block text-lg mb-2">Publish Course</label>
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="w-5 h-5 bg-gray-800 border border-gray-700 rounded"
            />
            <span className="ml-2 text-sm">Check to publish the course</span>
          </div>

          <button type="submit" className="submit-button bg-yellow-500 text-gray-900 px-4 py-2 rounded">
            Create Course
          </button>
        </form>
        {message && <p className="message text-yellow-400 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default CreateCourse;
