import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div className="bg-gray-900 text-white p-6 rounded-lg max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-400">Comments</h1>
      </div>

      <form className="space-y-4 mb-8" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <textarea
          placeholder="Add a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-yellow-400 text-black font-semibold rounded-lg px-4 py-2 hover:bg-yellow-500 transition duration-200"
        >
          Add Comment
        </button>
      </form>

      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span className="font-bold text-yellow-400">
                  {comment.username}
                </span>
                <span>{new Date(comment.createdAt).toLocaleString()}</span>
              </div>
              <p className="mt-2 text-gray-200">{comment.content}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 italic">
            No comments yet. Be the first to comment!
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
