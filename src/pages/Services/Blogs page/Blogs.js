// BlogList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Blogs.css"
import { AiOutlineEye, AiOutlineHeart } from 'react-icons/ai';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/blogs'); // Adjust the API endpoint as necessary
        setBlogs(response.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/blog/${id}`);
  };

  return (
    



    
   
    <section className="mt-12 mx-auto px-4 max-w-screen-xl md:px-8">
    <div className="text-center">
    <div className='relative max-w-xl mx-auto sm:text-center'>
                    <h1 className="text-gray-800 mb-20 font-bold text-4xl xl:text-5xl">
                   
                        <span className="text-indigo-600">  Blog</span>
                    </h1>
                </div>
       
        <p className="mt-3 text-gray-500">
            Blogs that are loved by the community. Updated every hour.
        </p>
    </div>
    <div className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
   
    {blogs.map(blog => (
       <article className="w-[400px] max-w-md mx-auto mt-4 shadow-lg border rounded-md transition duration-300 ease-in-out hover:scale-105" key={blog._id}>
       <a onClick={() => handleViewDetails(blog._id)} >
           <img src={blog.thumbnailUrl} loading="lazy" alt={blog.title} 
            className="w-full h-48 rounded-t-md " 
            //  className="max-w-xs transition duration-300 ease-in-out hover:scale-110"
            />
           <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
               <div className="ml-3">
                   <div className="flex items-center">
                       {blog.categories.map(category => (
                          <span key={category._id} className="text-sm text-gray-600 mr-2">
                              {category.name}
                          </span>
                       ))}
                   </div>
                   <span className="block text-gray-400 text-sm">{new Date(blog.updatedAt).toLocaleDateString()}</span>
               </div>
           </div>
           <div className="pt-3 ml-4 mr-2 mb-3">
               <h3 className="text-xl text-gray-900">
                   {blog.title}
               </h3>
               <div className="text-gray-400 text-sm mt-1 flex items-center">
                   <span className="mr-2 flex items-center">
                       <i className="text-gray-700 mr-1">
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
       </a>
   </article>
    ))}
    </div>
</section>
 
  );
};

export default BlogList;
{/* <div key={blog._id} className="blog-card">
          <img src={blog.thumbnailUrl} alt={blog.title} className="thumbnail" />
          <h2>{blog.title}</h2>
          <button onClick={() => handleViewDetails(blog._id)}>View Details</button>
        </div>
    <div className="blog-list"> */}
      {/* ggggggg */}
     