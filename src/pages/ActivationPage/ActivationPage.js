import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./ActivationPage.css"

const ActivationPage = () => {
  const { token } = useParams(); // Retrieve the token from the URL
  const [activationCode, setActivationCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError("Invalid activation link.");
    }
  }, [token]);

  const handleActivation = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://bsesa-backend.onrender.com/activation", { activationCode, token });
      setMessage("Account successfully activated! Redirecting to login...");
      
      setError("");

      setTimeout(() => {
        navigate("/login"); // Redirect to login page after successful activation
      }, 3000);
    } catch (err) {
      setMessage("");
      setError(err.response?.data.error || "Activation failed. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Activate Your Account</h2>
      <p>Please enter the activation code sent to your email.</p>

      <form onSubmit={handleActivation} style={{ margin: "20px auto", maxWidth: "400px" }}>
        <input
          type="text"
          value={activationCode}
          onChange={(e) => setActivationCode(e.target.value)}
          placeholder="Enter Activation Code"
          required
          style={{ width: "100%", padding: "10px", margin: "10px 0" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>Activate Account</button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ActivationPage;
