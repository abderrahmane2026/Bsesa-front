import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ConferenceDetailsPage.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaTags, FaUsers } from "react-icons/fa";

const ConferenceDetailsPage = () => {
  const { id } = useParams();
  const [conference, setConference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConference = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/conference/${id}`);
        setConference(response.data.conference);
        setLoading(false);
      } catch (err) {
        setError("Failed to load conference details.");
        setLoading(false);
      }
    };
    fetchConference();
  }, [id]);

  if (loading) return <p>Loading conference details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="conference-details">
      {conference && (
        <>
          <h2 className="conference-title">{conference.name}</h2>
          <img src={conference.image} alt={conference.name} className="conference-detail-image" />
          
          <div className="conference-info">
            <p><FaMapMarkerAlt /> <strong>Location:</strong> {conference.location}</p>
            <p><FaCalendarAlt /> <strong>Date:</strong> {new Date(conference.date.start).toLocaleDateString()} - {new Date(conference.date.end).toLocaleDateString()}</p>
          </div>
          
          <p className="conference-description">{conference.description}</p>
          
          <h3>Categories <FaTags /></h3>
          <ul className="conference-categories">
            {conference.categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
          
          <h3>Speakers <FaUsers /></h3>
          <div className="conference-speakers">
            {conference.speakers.map((speaker, index) => (
              <div key={index} className="speaker-card">
                <img src={speaker.image} alt={`${speaker.firstName} ${speaker.lastName}`} className="speaker-image" />
                <p>{speaker.firstName} {speaker.lastName}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ConferenceDetailsPage;
