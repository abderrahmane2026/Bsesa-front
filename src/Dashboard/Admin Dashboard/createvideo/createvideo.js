import React, { useState } from "react";
import axios from "axios";
import "./createvideo.css"; // Import the CSS file

const CreateVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [links, setLinks] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "video") setVideoFile(files[0]);
    if (name === "thumbnail") setThumbnailFile(files[0]);
    if (name === "pdf") setPdfFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", videoFile);
    formData.append("thumbnail", thumbnailFile);
    if (pdfFile) formData.append("pdf", pdfFile);
    formData.append("links", JSON.stringify(links.split(",")));

    try {
      const response = await axios.post("http://localhost:5000/video/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Video uploaded successfully!");
      setTitle("");
      setDescription("");
      setVideoFile(null);
      setThumbnailFile(null);
      setPdfFile(null);
      setLinks("");
    } catch (error) {
      setMessage(`Error: ${error.response.data.err}`);
    }
  };

  return (
    <div className="createvideo">
    <div className="container">
      <h1 className="heading">Create Video</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="formGroup">
          <label className="label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="formGroup">
          <label className="label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea"
            required
          />
        </div>
        <div className="formGroup">
          <label className="label">Video File</label>
          <input type="file" name="video" onChange={handleFileChange} className="fileInput" required />
        </div>
        <div className="formGroup">
          <label className="label">Thumbnail File</label>
          <input type="file" name="thumbnail" onChange={handleFileChange} className="fileInput" required />
        </div>
        <div className="formGroup">
          <label className="label">PDF File (Optional)</label>
          <input type="file" name="pdf" onChange={handleFileChange} className="fileInput" />
        </div>
        <div className="formGroup">
          <label className="label">Links (comma-separated)</label>
          <input
            type="text"
            value={links}
            onChange={(e) => setLinks(e.target.value)}
            className="input"
          />
        </div>
        <button type="submit" className="button">Upload Video</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
    </div>
  );
};

export default CreateVideo;
