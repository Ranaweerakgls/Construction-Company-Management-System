
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa'; // Profile icon from react-icons
import './ProfileUser.css';

function ProfileUser() {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3; // Maximum number of retry attempts

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      console.log('Fetch response:', response.data); // Log the response for debugging
      // Check if the response contains the expected user data
      if (response.data && response.data.user) {
        setUser(response.data.user); // Assuming the backend returns { user: {...} }
      } else {
        throw new Error('User data not found in response');
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching user:', err);
      let errorMessage = 'Failed to load user profile. ';
      if (err.response) {
        // Server responded with a status other than 2xx
        errorMessage += `Server error: ${err.response.status} - ${
          err.response.data?.message || 'Unknown error'
        }`;
      } else if (err.request) {
        // No response received (e.g., server not running)
        errorMessage += 'Could not connect to the server. Please ensure the backend is running.';
      } else {
        // Other errors (e.g., network issues)
        errorMessage += err.message;
      }
      setError(errorMessage);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleRetry = () => {
    if (retryCount < maxRetries) {
      setRetryCount(retryCount + 1);
      fetchUser();
    } else {
      setError('Maximum retry attempts reached. Please check your connection or contact support.');
    }
  };

  if (loading) {
    return <div className="profile-user-loading">Loading user profile...</div>;
  }

  if (error) {
    return (
      <div className="profile-user-error-container">
        <p className="profile-user-error">{error}</p>
        {retryCount < maxRetries && (
          <button className="profile-user-retry-button" onClick={handleRetry}>
            Retry
          </button>
        )}
      </div>
    );
  }

  if (!user) {
    return <div className="profile-user-error">User not found.</div>;
  }

  return (
    <div className="profile-user-container">
      <div className="profile-user-header">
        <FaUserCircle className="profile-user-icon" />
        <h1 className="profile-user-name">{user.name || 'N/A'}</h1>
        <p className="profile-user-role">{user.userrole || 'N/A'}</p>
      </div>

      <div className="profile-user-details">
        <div className="profile-user-detail-item">
          <span className="profile-user-label">User ID:</span>
          <span className="profile-user-value">{user.userid || 'N/A'}</span>
        </div>
        <div className="profile-user-detail-item">
          <span className="profile-user-label">Email:</span>
          <span className="profile-user-value">{user.email || 'N/A'}</span>
        </div>
        <div className="profile-user-detail-item">
          <span className="profile-user-label">Age:</span>
          <span className="profile-user-value">{user.age || 'N/A'}</span>
        </div>
        <div className="profile-user-detail-item">
          <span className="profile-user-label">Address:</span>
          <span className="profile-user-value">{user.address || 'N/A'}</span>
        </div>
        {/* Password is excluded for security reasons */}
      </div>
    </div>
  );
}

export default ProfileUser;
