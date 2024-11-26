import React, { useState } from "react";
import axios from "axios";
 // Import your CSS if available

const AddVideoPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [links, setLinks] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile || !thumbnailFile) {
      setResponseMessage("Both video and thumbnail files are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", videoFile);
    formData.append("thumbnail", thumbnailFile);
    if (links) {
      formData.append("links", JSON.stringify(links.split(",")));
    }

    try {
      const response = await axios.post("https://bsesa-backend.onrender.com/video/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setResponseMessage(response.data.message);
      setTitle("");
      setDescription("");
      setVideoFile(null);
      setThumbnailFile(null);
      setLinks("");
    } catch (error) {
      setResponseMessage(error.response?.data?.err || "Failed to upload video.");
      console.error("Error uploading video:", error);
    }
  };

  return (
    <div className="bg-[#1A1A1A] text-white min-h-screen flex items-center justify-center py-24 px-6 lg:px-16">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-yellow-400 text-center">Add New Video</h2>
        {responseMessage && <p className="text-yellow-500 text-center font-medium">{responseMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="title" className="mb-2 font-semibold">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="mb-2 font-semibold">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="video" className="mb-2 font-semibold">Video File</label>
            <input
              type="file"
              id="video"
              onChange={(e) => setVideoFile(e.target.files[0])}
              required
              className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="thumbnail" className="mb-2 font-semibold">Thumbnail Image</label>
            <input
              type="file"
              id="thumbnail"
              onChange={(e) => setThumbnailFile(e.target.files[0])}
              required
              className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="links" className="mb-2 font-semibold">Links (Comma separated)</label>
            <input
              type="text"
              id="links"
              value={links}
              onChange={(e) => setLinks(e.target.value)}
              className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-6 font-semibold text-gray-900 bg-yellow-400 rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50"
          >
            Upload Video
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVideoPage;
