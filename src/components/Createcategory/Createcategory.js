import React, { useState } from "react";
import axios from "axios";
import "./Createcategory.css"; // Import the CSS file

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/categories", {
        name,
        description,
      });
      setMessage(response.data.message);
      console.log("Category created successfully");
      setName("");
      setDescription("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to create category");
    }
  };

  return (
    <div className="create-category-container">
      <h2 className="create-category-header">Create a New Category</h2>
      {message && <p className="create-category-message">{message}</p>}
      <form onSubmit={handleSubmit} className="create-category-form">
        <label htmlFor="name" className="create-category-label">Category Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="create-category-input"
        />

        <label htmlFor="description" className="create-category-label">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="create-category-textarea"
        />

        <button type="submit" className="create-category-button">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
