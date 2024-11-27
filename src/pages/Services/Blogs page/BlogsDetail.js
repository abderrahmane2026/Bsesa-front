import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BlogsDetail.css';
import { FaHeart, FaRegHeart, FaComment, FaUserCircle, FaBookmark } from 'react-icons/fa';
import { refresh } from '../../../Dashboard/Admin Dashboard/createblog/NewBlogPage';
import { AiOutlineEye } from 'react-icons/ai';
import { CiBookmark } from "react-icons/ci";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const currentUserId = currentUser ? currentUser.id : null;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`https://bsesa-backend-1.onrender.com/blog/${id}`);
        setBlog(response.data);

        if (currentUserId) {
          setIsLiked(response.data.likes?.includes(currentUserId));
        }
      } catch (error) {
        console.error('Failed to fetch blog details:', error);
      }
    };

    fetchBlog();
  }, [id, currentUserId]);

  const handleLikeToggle = async () => {
    try {
      const checkToken = await refresh();
      if (!checkToken) throw new Error('You must log in');

      const response = await axios.put(
        `https://bsesa-backend-1.onrender.com/blog/like/${id}`,
        {},
        {
         
          withCredentials: true,
        }
      );

      setBlog((prevBlog) => ({
        ...prevBlog,
        likes: response.data.likes,
      }));
      setIsLiked(!isLiked);
      setResponseMessage('Like toggled successfully!');
    } catch (error) {
      setResponseMessage('Failed to toggle like.');
      console.error('Error:', error);
    }
  };

  const handleSaveToggle = () => {
    setIsSaved(!isSaved);
    setResponseMessage(isSaved ? 'Post unsaved!' : 'Post saved!');
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const checkToken = await refresh();
      if (!checkToken) throw new Error('You must log in');

      const response = await axios.put(
        `https://bsesa-backend-1.onrender.com/blog/comment/${id}`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      setBlog((prevBlog) => ({
        ...prevBlog,
        comments: [...(prevBlog.comments || []), response.data.savedComment],
      }));
      setNewComment('');
      setResponseMessage('Comment added successfully!');
    } catch (error) {
      setResponseMessage('Failed to add comment.');
      console.error('Error:', error);
    }
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div className=" bg-[#1A1A1A] text-white py-24 px-6 lg:px-16">
      <div className="blog-header  text-center">
        <img src={blog.thumbnailUrl} alt={blog.title} className="detail-thumbnail w-full h-96 object-cover rounded-md border border-gray-700" />
        <h1 className="text-yellow-400 mt-6 text-4xl font-bold">{blog.title}</h1>
        <p className="blog-content text-gray-300 mt-4 text-lg">{blog.content}</p>
        <p className="blog-views text-gray-400 mt-2 flex items-center justify-center">
          <AiOutlineEye className="mr-1" /> {blog.views} Views
        </p>
      </div>

      {/* Like and Save Buttons */}
      <div className="blog-interactions mt-8 flex justify-center gap-6">
        <button onClick={handleLikeToggle} className="like-button focus:outline-none">
          {isLiked ? <FaHeart style={{ color: 'red', fontSize: '2rem' }} /> : <FaRegHeart style={{ fontSize: '2rem', color: 'gray' }} />}
        </button>
        <span className="text-gray-400 text-lg">{blog.likes?.length || 0} Likes</span>
        <button onClick={handleSaveToggle} className="save focus:outline-none">
          {isSaved ? <FaBookmark style={{ color: '#FFD700', fontSize: '2rem' }} /> : <CiBookmark style={{ fontSize: '2rem', color: 'gray' }} />}
        </button>
      </div>

      {/* Comments Section */}
      <div className="comments-section mt-12">
        <h3 className="text-2xl text-yellow-400 mb-4 flex items-center">
          <FaComment className="mr-2" /> Comments
        </h3>
        <ul className="comments-list">
          {(blog.comments || []).map((comment) => (
            <li key={comment._id} className="comment-item bg-[#222222] p-4 rounded-md mb-4 border border-gray-700">
              <div className="comment-author flex items-center mb-2">
                {comment.author.image ? (
                  <img src={comment.author.image} alt={`${comment.author.firstName} ${comment.author.lastName}`} className="author-image w-10 h-10 rounded-full mr-3" />
                ) : (
                  <FaUserCircle className="author-placeholder text-gray-500 w-10 h-10 mr-3" />
                )}
                <span className="author-name text-gray-300 font-bold">
                  {comment.author.firstName} {comment.author.lastName}
                </span>
              </div>
              <p className="comment-content text-gray-400">{comment.content}</p>
              <small className="comment-date text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleCommentSubmit} className="comment-form mt-8 flex items-center">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="comment-input w-full bg-[#333333] text-gray-300 p-4 rounded-l-md focus:outline-none"
        />
        <button type="submit" className="comment-submit bg-yellow-400 text-black p-4 rounded-r-md hover:bg-yellow-500">
          <FaComment />
        </button>
      </form>
    </div>
  );
};

export default BlogDetail;
