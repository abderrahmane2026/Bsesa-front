import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Blogs.css";
import { AiOutlineEye, AiOutlineHeart } from "react-icons/ai";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://bsesa-backend.onrender.com/blogs", {
          params: { page, limit: 20 },
        });
        setBlogs(response.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setError(error.response?.data?.err || "Internal Server Error");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [page]);

  const handleViewDetails = (id) => {
    navigate(`/blog/${id}`);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  return (
    <section className="bg-[#1A1A1A] text-white py-24 px-6 lg:px-16">
      <div className="text-center">
        <div className="relative max-w-xl mx-auto sm:text-center">
          <h1 className="text-gray-100 mb-20 font-bold text-4xl xl:text-5xl">
            <span className="text-yellow-400">Blog</span>
          </h1>
        </div>
        <p className="mt-3 text-gray-300">
          Blogs that are loved by the community. Updated every hour.
        </p>
      </div>
      {error && <div className="text-center mt-4 text-red-500">{error}</div>}
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {blogs.map((blog) => (
          <article
            className="bg-[#222222] w-full shadow-lg border border-gray-700 rounded-md transition duration-300 ease-in-out hover:scale-105"
            key={blog._id}
          >
            <div onClick={() => handleViewDetails(blog._id)} className="cursor-pointer">
              <img
                src={blog.thumbnailUrl}
                loading="lazy"
                alt={blog.title}
                className="w-full h-64 object-cover rounded-t-md"
              />
              <div className="flex items-center mt-2 pt-3 px-4">
                <div className="ml-3">
                  <div className="flex items-center flex-wrap">
                    {blog.categories.map((category) => (
                      <span
                        key={category._id}
                        className="text-sm text-gray-400 mr-2"
                      >
                        {category.name}
                      </span>
                    ))}
                  </div>
                  <span className="block text-gray-500 text-sm">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="pt-3 px-4 pb-4">
                <h3 className="text-2xl text-gray-200">{blog.title}</h3>
                <div className="text-gray-400 text-sm mt-1 flex items-center">
                  <span className="mr-4 flex items-center">
                    <i className="text-gray-300 mr-1">
                      <AiOutlineEye />
                    </i>
                    {blog.views} views
                  </span>
                  <span className="flex items-center">
                    <i className="text-red-500 mr-1">
                      <AiOutlineHeart />
                    </i>
                    {blog.likes.length} likes
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="px-6 py-2 mr-4 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Previous Page
        </button>
        <button
          onClick={handleNextPage}
          className="px-6 py-2 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500"
        >
          Next Page
        </button>
      </div>
      {loading && <div className="text-center mt-4 text-yellow-400">Loading...</div>}
    </section>
  );
};

export default BlogList;
