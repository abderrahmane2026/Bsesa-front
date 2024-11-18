import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './account.css';
import { refresh } from '../../../Dashboard/Admin Dashboard/createblog/NewBlogPage';

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const result = await refresh();
      if (result) {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          setUser(storedUser);
          setFirstName(storedUser.firstName);
          setLastName(storedUser.lastName);
        } else {
          setResponseMessage("User data not found in local storage.");
        }
      }
    };
    fetchUser();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadAvatar = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.put('http://localhost:5000/avatar', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser({ ...user, image: response.data.imageUrl });
      setResponseMessage('Upload successful!');
    } catch (error) {
      setResponseMessage('Upload failed.');
      console.error('Error uploading the file:', error);
    }
  };

  const updateUserData = async () => {
    try {
      const response = await axios.put(
        'http://localhost:5000/userupdate',
        { firstName, lastName },
        { withCredentials: true }
      );
      
      // Update user state and localStorage with new name data
      const updatedUser = { ...user, firstName: response.data.user.firstName, lastName: response.data.user.lastName };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser)); // Save updated user data to localStorage
      setResponseMessage('User data updated successfully!');
    } catch (error) {
      setResponseMessage('Failed to update user data.');
      console.error('Error updating user data:', error);
    }
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="account-page">
  <h2>Account Details</h2>
  {responseMessage && (
    <p className={`response-message ${responseMessage.includes('failed') ? 'error' : ''}`}>
      {responseMessage}
    </p>
  )}
  <div className="account-card">
    <div className="user-image">
      <img src={user.image || 'path_to_default_image.png'} alt="User Profile" />
      <input type="file" id="avatarUpload" onChange={handleFileChange} />
      <label htmlFor="avatarUpload">Choose Avatar</label>
      <button onClick={uploadAvatar}>Update Avatar</button>
    </div>
    <div className="user-info">
      <label>
        <strong>First Name:</strong>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        <strong>Last Name:</strong>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <button onClick={updateUserData}>Update Name</button>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Status:</strong> {user.isActive ? 'Active' : 'Inactive'}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      <p><strong>Last Updated:</strong> {new Date(user.updatedAt).toLocaleDateString()}</p>
    </div>
  </div>
</div>
  );
};

export default AccountPage;
