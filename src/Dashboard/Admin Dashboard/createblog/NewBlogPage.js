import React, { useState, useEffect } from "react";
import axios from "axios";
import "./NewBlogPage.css";
import { useStore } from "../../../Context/testzustand";



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


// useEffect(()=>{
//   if(user){
//     navigate("/", { replace: true });
//     window.location.reload();
//   }
// },[])
const BlogForm = () => {
const { user} =useStore();

  const [categories, setCategories] = useState([]); // State to store categories
 
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author:user._id,
    categories: [], // Store selected categories as an array
    thumbnailUrl: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/categories");
        console.log("Fetched categories:", response.data); // عرض البيانات للتحقق
        setCategories(response.data.categorys); // الوصول إلى المصفوفة داخل الكائن
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCategories();
  }, []);
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, option => option.value);
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
  
      console.log("Sending formData:", formData); // تحقق من البيانات هنا
  
      const response = await axios.post("http://localhost:5000/blog/create", formData, {
        withCredentials: true,
      });
  
      setResponseMessage("Blog post created successfully!");
      setFormData({
        title: "",
        content: "",
        author:user,
        categories: [],
        thumbnailUrl: "",
      });
      // navigator("/Blogs");
    } catch (error) {
      setResponseMessage("Failed to create blog post.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="blog-form-container">
      <h2>Create New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Content:
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </label>

        <label>
  Categories:
  <select
    name="categories"
    multiple
    value={formData.categories}
    onChange={handleCategoryChange}
  >
    {Array.isArray(categories) && categories.map((category) => (
      <option key={category._id} value={category._id}>
        {category.name}
      </option>
    ))}
  </select>
</label>

        <label>
          Thumbnail URL:
          <input
            type="text"
            name="thumbnailUrl"
            value={formData.thumbnailUrl}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Create Post</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default BlogForm;
