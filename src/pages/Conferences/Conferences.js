import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import "./Conferences.css"; // Importing CSS for styling
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const ConferencesPage = () => {
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchConferences = async () => {
      try {
        const response = await axios.get("https://bsesa-backend-1.onrender.com/conferences");
        setConferences(response.data.conferences);
        setLoading(false);
      } catch (err) {
        setError("Failed to load conferences.");
        setLoading(false);
      }
    };
    fetchConferences();
  }, []);

  if (loading) return <p className="text-gray-300">Loading conferences...</p>;
  if (error) return <p className="error-message text-red-500">{error}</p>;

  return (
    <div className="conferences-page bg-[#1A1A1A] text-white py-24 px-6 lg:px-16">
      <div className="text-center">
        <h1 className="text-gray-100 mb-20 font-bold text-4xl xl:text-5xl">
          All <span className="text-yellow-400">Conferences</span>
        </h1>
      </div>

      <div className="conferences-grid grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {conferences.map((conference) => (
          <div key={conference._id} className="conference-card bg-[#222222] p-6 rounded-md shadow-lg border border-gray-700 transition-transform duration-300 hover:scale-105">
            <img
              src={conference.image}
              alt={conference.name}
              className="conference-image w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="conference-name text-2xl text-gray-100 font-bold mb-2">{conference.name}</h3>
            <div className="conference-info text-gray-400 mb-4">
              <p className="flex items-center mb-1">
                <FaMapMarkerAlt className="mr-2" /> {conference.location}
              </p>
              <p className="flex items-center">
                <FaCalendarAlt className="mr-2" /> {new Date(conference.date.start).toLocaleDateString()}
              </p>
            </div>
            <p className="conference-description text-gray-300 mb-4">
              {conference.description.substring(0, 100)}...
            </p>
            <Link
              to={`/ConferenceDetailsPage/${conference._id}`}
              className="read-more-button bg-yellow-400 text-black py-2 px-4 rounded-md hover:bg-yellow-500 transition-colors duration-200"
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
