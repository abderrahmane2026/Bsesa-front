import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BlogsDetail.css';
import { FaHeart, FaRegHeart, FaComment, FaUserCircle, FaSave, FaBookmark } from 'react-icons/fa';
import { refresh } from '../../../Dashboard/Admin Dashboard/createblog/NewBlogPage';
import { AiOutlineEye, AiOutlineHeart } from 'react-icons/ai';
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
        const response = await axios.get(`http://localhost:5000/blog/${id}`);
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
        `http://localhost:5000/blog/like/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
        `http://localhost:5000/blog/comment/${id}`,
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
    <div className="blog-detail">
      <div className="blog-header">
        <img src={blog.thumbnailUrl} alt={blog.title} className="detail-thumbnail" />
        <h1>{blog.title}</h1>
        <p className="blog-content">{blog.content}</p>
      
        <p className="blog-views">  <strong>Views:</strong> <AiOutlineEye/>{blog.views}</p>
      </div>

      {/* Like Button */}
      <div className="blog-interactions">
        <button onClick={handleLikeToggle} className="like-button">
          {isLiked ? <FaHeart style={{ color: 'red', fontSize: '1.5rem' }} /> : <FaRegHeart style={{ fontSize: '1.5rem' }} />}
        </button>
        {blog.likes?.length || 0}
        <button onClick={handleSaveToggle} className='save'>
          {isSaved ? <FaBookmark  style={{ color: '#007bff', fontSize: '2rem' }} /> : <CiBookmark style={{ fontSize: '2rem' }} />} {/* Updated save icon */}
        </button>
      </div>

      {/* Display Response Message */}
      {/* {responseMessage && <p className="response-message">{responseMessage}</p>} */}

      {/* Comments Section */}
      <div className="comments-section">
        <h3><FaComment /> Comments</h3>
        <ul className="comments-list">
          {(blog.comments || []).map((comment) => (
            <li key={comment._id} className="comment-item">
              <div className="comment-author">
                {comment.author.image ? (
                  <img src={comment.author.image} alt={`${comment.author.firstName} ${comment.author.lastName}`} className="author-image" />
                ) : (
                  <FaUserCircle className="author-placeholder" /> /* Updated to use user icon */
                )}
                <span className="author-name">{comment.author.firstName} {comment.author.lastName}</span>
              </div>
             
              <p className="comment-content">{comment.content}</p>
              <small className="comment-date">{new Date(comment.createdAt).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleCommentSubmit} className="comment-form">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="comment-input"
        />
        <button type="submit" className="comment-submit">
          <FaComment />
        </button>
      </form>
    </div>
  );
};

export default BlogDetail;
