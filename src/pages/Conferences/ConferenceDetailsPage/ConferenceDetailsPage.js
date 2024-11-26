import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaCalendarAlt, FaTags, FaUsers, FaUser } from "react-icons/fa";

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

  if (loading) return <p className="text-center text-gray-400">Loading conference details...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="dark bg-gray-900 text-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {conference && (
          <>
            <h2 className="text-3xl font-bold text-center mt-4">{conference.name}</h2>
            <img
              src={conference.image}
              alt={conference.name}
              className="w-full max-h-96 object-cover rounded-lg mt-6"
            />

            <div className="mt-6 space-y-4">
              <p className="flex items-center text-lg">
                <FaMapMarkerAlt className="mr-2" /> <strong>Location:</strong> {conference.location}
              </p>
              <p className="flex items-center text-lg">
                <FaCalendarAlt className="mr-2" /> <strong>Date:</strong> {new Date(conference.date.start).toLocaleDateString()} - {new Date(conference.date.end).toLocaleDateString()}
              </p>
            </div>

            <p className="mt-6 text-justify">{conference.description}</p>

            <h3 className="text-2xl font-semibold mt-8 flex items-center">
              Categories <FaTags className="ml-2" />
            </h3>
            <ul className="list-disc pl-6 mt-4">
              {conference.categories.map((category, index) => (
                <li key={index} className="text-lg">{category}</li>
              ))}
            </ul>

            <h3 className="text-2xl font-semibold mt-8 flex items-center">
              Speakers <FaUsers className="ml-2" />
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {conference.speakers.map((speaker, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <img
                    src={speaker.image}
                    alt={<FaUser/>}
                    className="w-20 h-20 rounded-full mx-auto"
                  />
                  <p className="text-center mt-4 font-medium">{speaker.firstName} {speaker.lastName}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConferenceDetailsPage;
