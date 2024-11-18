import React, { useState, useEffect } from 'react';
import "./Settings.css";

export default function Settings() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    newPassword: '',
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    // Load user data from local storage (or your API)
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUserData((prevData) => ({
        ...prevData,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        email: savedUser.email,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (userData.newPassword && userData.newPassword.length < 6) {
      setMessage("Password should be at least 6 characters long.");
      return;
    }
    
    // Save updated data to localStorage (or your API)
    const updatedUserData = {
      ...userData,
      password: '', // clear password field after saving
      newPassword: '', // clear new password field after saving
    };
    localStorage.setItem("user", JSON.stringify(updatedUserData));
    setMessage("Profile updated successfully!");
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSave} className="settings-form">
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={userData.newPassword}
            onChange={handleChange}
            placeholder="New Password (optional)"
          />
        </div>
        <button type="submit" className="save-button">Save Changes</button>
      </form>
    </div>
  );
}
