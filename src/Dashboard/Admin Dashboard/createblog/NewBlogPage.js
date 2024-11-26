import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewBlogPage.css";
import { useStore } from "../../../Context/testzustand";
import { useNavigate } from "react-router-dom";

// Refresh function to check login status
export const refresh = async () => {
  try {
    const res = await axios.get("http://localhost:5000/refresh", {
      withCredentials: true,
    });
    return true;
  } catch (error) {
    return false;
  }
};

const BlogForm = () => {
  const { user } = useStore();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); // State to store categories
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: user._id,
    categories: [], // Store selected categories as an array
    file: null, // Add file input state
  });
  const [responseMessage, setResponseMessage] = useState("");

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        console.log("Fetched categories:", response.data); // Display data to verify
        setCategories(response.data.categorys); // Access array inside the object
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0], // Update file input
    });
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({
      ...formData,
      categories: selectedCategories, // Update selected categories
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const checkToken = await refresh();
      if (!checkToken) throw new Error("You Must Login");

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      formDataToSend.append("author", formData.author);
      formData.categories.forEach((category) => {
        formDataToSend.append("categories", category);
      });
      formDataToSend.append("file", formData.file);

      console.log("Sending formData:", formData); // Verify data here

      const response = await axios.post("http://localhost:5000/blog/create", formDataToSend, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Blog post created successfully")
      setResponseMessage("Blog post created successfully!");
      setFormData({
        title: "",
        content: "",
        author: user._id,
        categories: [],
        file: null,
      });
      navigate("/Blogs",);
    } catch (error) {
      setResponseMessage("Failed to create blog post.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-yellow-400 text-center">Create New Blog Post</h2>
        {responseMessage && <p className="text-yellow-500 text-center">{responseMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="title" className="mb-1 font-semibold">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="content" className="mb-1 font-semibold">Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="categories" className="mb-1 font-semibold">Categories</label>
            <select
              id="categories"
              name="categories"
              multiple
              value={formData.categories}
              onChange={handleCategoryChange}
              className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              {Array.isArray(categories) &&
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="file" className="mb-1 font-semibold">Thumbnail Image</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              required
              className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-6 font-semibold text-gray-900 bg-yellow-400 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
