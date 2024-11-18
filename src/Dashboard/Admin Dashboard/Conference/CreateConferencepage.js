import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateConferencepage.css"; // Importing CSS file for styles
import { refresh } from '../createblog/NewBlogPage';

const NewConferencePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [conferenceData, setConferenceData] = useState({
    name: "",
    description: "",
    location: "",
    date: { start: "", end: "" },
    categories: [],
    speakers: [{ firstName: "", lastName: "", image: "" }],
    image: "", // رابط الصورة
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConferenceData({ ...conferenceData, [name]: value });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setConferenceData({
      ...conferenceData,
      date: { ...conferenceData.date, [name]: value },
    });
  };

  const handleAddCategory = () => {
    setConferenceData({
      ...conferenceData,
      categories: [...conferenceData.categories, ""],
    });
  };

  const handleCategoryChange = (index, value) => {
    const newCategories = [...conferenceData.categories];
    newCategories[index] = value;
    setConferenceData({ ...conferenceData, categories: newCategories });
  };

  const handleAddSpeaker = () => {
    setConferenceData({
      ...conferenceData,
      speakers: [...conferenceData.speakers, { firstName: "", lastName: "", image: "" }],
    });
  };

  const handleSpeakerChange = (index, field, value) => {
    const newSpeakers = [...conferenceData.speakers];
    newSpeakers[index][field] = value;
    setConferenceData({ ...conferenceData, speakers: newSpeakers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const checkToken = await refresh();
      if (!checkToken) throw new Error("You Must Login");

      await axios.post("http://localhost:5000/conference/create", conferenceData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      navigate("/ConferencesPage");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create conference");
    }
  };

  return (
    <div className="new-conference-page">
      <h2>Create New Conference</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="conference-form">
        <label>
          Conference Name:
          <input type="text" name="name" value={conferenceData.name} onChange={handleInputChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={conferenceData.description} onChange={handleInputChange} required />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={conferenceData.location} onChange={handleInputChange} required />
        </label>
        <label>
          Start Date:
          <input type="date" name="start" value={conferenceData.date.start} onChange={handleDateChange} required />
        </label>
        <label>
          End Date:
          <input type="date" name="end" value={conferenceData.date.end} onChange={handleDateChange} />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={conferenceData.image}
            onChange={handleInputChange}
            placeholder="https://example.com/image.jpg"
          />
        </label>
        <label>
          Categories:
          {conferenceData.categories.map((category, index) => (
            <input
              key={index}
              type="text"
              value={category}
              onChange={(e) => handleCategoryChange(index, e.target.value)}
            />
          ))}
          <button type="button" onClick={handleAddCategory} className="add-button">
            Add Category
          </button>
        </label>
        <label>
          Speakers:
          {conferenceData.speakers.map((speaker, index) => (
            <div key={index} className="speaker-inputs">
              <input
                type="text"
                placeholder="First Name"
                value={speaker.firstName}
                onChange={(e) => handleSpeakerChange(index, "firstName", e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={speaker.lastName}
                onChange={(e) => handleSpeakerChange(index, "lastName", e.target.value)}
              />
              <input
                type="text"
                placeholder="Image URL"
                value={speaker.image}
                onChange={(e) => handleSpeakerChange(index, "image", e.target.value)}
              />
            </div>
          ))}
          <button type="button" onClick={handleAddSpeaker} className="add-button">
            Add Speaker
          </button>
        </label>
        <button type="submit" className="submit-button">
          Create Conference
        </button>
      </form>
    </div>
  );
};

export default NewConferencePage;
