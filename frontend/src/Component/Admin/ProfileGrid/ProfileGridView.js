import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Profile icon from react-icons
import '../User Details/Users.css'; // Import UserDetails.css for styling

function ProfileGridView({ users }) {
    console.log('ProfileGridView users prop:', users); // Log the users prop
    if (!users || users.length === 0) {
      return <div className="userdetails-no-users">No users found</div>;
    }
  
    return (
      <div className="userdetails-grid-container">
        {users.map((user) => (
          <div key={user._id} className="userdetails-profile-card">
            <div className="userdetails-profile-header">
              <FaUserCircle className="userdetails-profile-icon" />
              <h2 className="userdetails-profile-name">{user.name || 'N/A'}</h2>
              <p className="userdetails-profile-role">{user.userrole || 'N/A'}</p>
            </div>
            <div className="userdetails-profile-details">
              <div className="userdetails-profile-detail-item">
                <span className="userdetails-profile-label">User ID:</span>
                <span className="userdetails-profile-value">{user.userid || 'N/A'}</span>
              </div>
              <div className="userdetails-profile-detail-item">
                <span className="userdetails-profile-label">Email:</span>
                <span className="userdetails-profile-value">{user.email || 'N/A'}</span>
              </div>
              <div className="userdetails-profile-detail-item">
                <span className="userdetails-profile-label">Age:</span>
                <span className="userdetails-profile-value">{user.age || 'N/A'}</span>
              </div>
              <div className="userdetails-profile-detail-item">
                <span className="userdetails-profile-label">Address:</span>
                <span className="userdetails-profile-value">{user.address || 'N/A'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
}

export default ProfileGridView;