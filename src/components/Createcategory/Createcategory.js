import React, { useState } from "react";
import axios from "axios";
import "./Createcategory.css"; // Import the CSS file
import { refresh } from "../../Dashboard/Admin Dashboard/createblog/NewBlogPage";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if token needs to be refreshed
      const checkToken = await refresh();
      if (!checkToken) throw new Error("You Must Login");
      // Make request to add category with refreshed authentication token
      const response = await axios.post(
        "http://localhost:5000/categories",
        { name, description },
        {
          withCredentials: true,
        }
      );
      setMessage(response.data.message);
      console.log("Category created successfully");
      setName("");
      setDescription("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to create category");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center text-white">
      <div className="w-full max-w-md p-8 space-y-4 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-yellow-400 text-center">Create a New Category</h2>
        {message && <p className="text-yellow-500 text-center">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 font-semibold">Category Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="mb-1 font-semibold">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-gray-900 bg-yellow-400 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
