import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const URL = 'http://localhost:5000/users';

function Profile() {
  const { userId } = useParams(); // Get userId from URL for viewing other users' profiles
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Assume logged-in user's ID is stored in localStorage
  const loggedInUserId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const idToFetch = userId || loggedInUserId;
        if (!idToFetch) {
          throw new Error('No user ID available');
        }
        console.log('Fetching user with ID:', idToFetch); // Debug log
        const response = await axios.get(`${URL}/${idToFetch}`);
        console.log('API response:', response.data); // Debug log
        // Backend returns { users: {...} }, so use response.data.users
        if (response.data.users) {
          setUser(response.data.users);
        } else {
          throw new Error('User data not found in response');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.response?.data?.message || 'Failed to fetch user details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId, loggedInUserId]);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  if (isLoading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  if (error) {
    return <div className="profile-error">{error}</div>;
  }

  if (!user) {
    return <div className="profile-error">User not found</div>;
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-card">
        <div className="profile-header">
          <h2>{user.name}</h2>
          <span className={`profile-role ${user.userrole}`}>{user.userrole}</span>
        </div>
        <div className="profile-details">
          <p><strong>User ID:</strong> {user.userid}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Age:</strong> {user.age || 'N/A'}</p>
          <p><strong>Address:</strong> {user.address || 'N/A'}</p>
          <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
        </div>
        <div className="profile-actions">
          <button onClick={handleBack} className="profile-back-button">
            Back
          </button>
          {/* {loggedInUserId === user._id && ( 
           <button onClick={() => navigate(`/edit-profile/${user._id}`)} className="profile-edit-button">
              Edit Profile
            </button>
          )}*/}
        </div>
      </div>
    </div>
  );
}

export default Profile;