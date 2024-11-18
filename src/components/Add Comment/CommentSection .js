import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommentSection.css'; // Import the CSS file

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments/${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = { postId, username, content };
    try {
      const response = await axios.post('/api/comments', newComment);
      setComments([response.data, ...comments]);
      setUsername('');
      setContent('');
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="comment-wrapper">
       <div className='relative max-w-xl mx-auto sm:text-center'>
                    <h1 className="text-gray-800 mb-20 font-bold text-4xl xl:text-5xl">
                   
                        <span className="text-indigo-600">  Comments</span>
                    </h1>
                </div>

      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="comment-input"
        />
        <textarea
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="comment-textarea"
        ></textarea>
        <button type="submit" className="comment-button">
          Add Comment
        </button>
      </form>

      <div className="comment-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="comment">
              <div className="comment-header">
                <span className="comment-username">{comment.username}</span>
                <span className="comment-timestamp">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="comment-text">{comment.content}</p>
            </div>
          ))
        ) : (
          <div className="comment-empty-state">No comments yet. Be the first to comment!</div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
