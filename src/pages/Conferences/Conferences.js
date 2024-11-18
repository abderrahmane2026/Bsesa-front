import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Conferences.css"; // Importing CSS for styling
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const ConferencesPage = () => {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await axios.get("http://localhost:5000/conferences");
        setConferences(response.data.conferences);
        setLoading(false);
      } catch (err) {
        setError("Failed to load conferences.");
        setLoading(false);
      }
    };
    fetchConferences();
  }, []);

  if (loading) return <p>Loading conferences...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="conferences-page">
      
                    <h1 className="text-gray-800 mb-20 font-bold text-4xl xl:text-5xl">
                   All
                        <span className="text-indigo-600">  Conferences</span>
                    </h1>
                
     
      <div className="conferences-grid">
        {conferences.map((conference) => (
          <div key={conference._id} className="conference-card">
            <img
              src={conference.image}
              alt={conference.name}
              className="conference-image"
            />
            <h3 className="conference-name">{conference.name}</h3>
            <div className="conference-info">
              <p><FaMapMarkerAlt /> {conference.location}</p>
              <p><FaCalendarAlt /> {new Date(conference.date.start).toLocaleDateString()}</p>
            </div>
            <p className="conference-description">{conference.description.substring(0, 100)}...</p>
            <Link
              to={`/ConferenceDetailsPage/${conference._id}`}
              className="read-more-button"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConferencesPage;