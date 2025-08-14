import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './Admindashboard.css';
import {
  FaTachometerAlt, FaUsers, FaUserCircle, FaBell,
  FaExclamationCircle, FaHandshake, FaQuestionCircle,
  FaSignOutAlt, FaCommentDots
} from 'react-icons/fa';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const pieData = [
  { name: 'Admins', value: 20 },
  { name: 'Managers', value: 50 },
  { name: 'Employees', value: 200 },
  { name: 'Clients', value: 100 }
];

const barData = [
  { name: 'Jan', users: 400, projects: 240 },
  { name: 'Feb', users: 300, projects: 139 },
  { name: 'Mar', users: 600, projects: 380 },
  { name: 'Apr', users: 800, projects: 430 },
  { name: 'May', users: 500, projects: 290 },
  { name: 'Jun', users: 700, projects: 400 },
];

// Utility function to calculate time ago
const getTimeAgo = (date) => {
  const createdAt = new Date(date);
  if (isNaN(createdAt.getTime())) {
    return 'Unknown time'; // Fallback if date is invalid
  }

  const now = new Date();
  const diffMs = now - createdAt;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  return `${diffSeconds} second${diffSeconds !== 1 ? 's' : ''} ago`;
};

// Utility function to get timestamp from MongoDB ObjectID
const getTimestampFromObjectId = (objectId) => {
  return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
};

function AdminDashboard() {
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState(0);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      const users = response.data.users || [];
      console.log('Fetched users:', users); // Debug: Log the fetched users

      setTotalUsers(users.length);

      // Filter users with valid createdAt, then sort by createdAt in descending order
      const validUsers = users.filter(user => user.createdAt && !isNaN(new Date(user.createdAt).getTime()));
      console.log('Users with valid createdAt:', validUsers); // Debug: Log users with valid createdAt

      let sortedUsers;
      if (validUsers.length > 0) {
        // If there are users with valid createdAt, sort by createdAt
        sortedUsers = validUsers
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 1);
      } else {
        // Fallback: Sort by _id timestamp if createdAt is unavailable or invalid
        console.warn('Falling back to sorting by _id timestamp');
        sortedUsers = users
          .sort((a, b) => getTimestampFromObjectId(b._id) - getTimestampFromObjectId(a._id))
          .slice(0, 1);
      }

      console.log('Most recent user:', sortedUsers); // Debug: Log the most recent user
      setRecentUsers(sortedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      setTotalUsers(0);
      setRecentUsers([]);
    }
  };

  const fetchPendingRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Password');
      const passwords = response.data.passwords || [];
      setPendingRequests(passwords.length);
    } catch (error) {
      console.error('Error fetching password reset requests:', error);
      setPendingRequests(0);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchUsers(), fetchPendingRequests()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    if (typeof window.cancelRequest === 'function') {
      window.cancelRequest();
    }
    alert('Logged out successfully');
    navigate('/log', { replace: true });
  };

  return (
    <div className="ad-admin-dashboard">
      <header className="ad-dashboard-header">
        <div className="ad-header-left">
          <h1>SMN Construction</h1>
        </div>
        <div className="ad-header-right">
          <div className="ad-notification-badge">
            <Link to="/notificationdetails">
              <FaBell className="ad-icon ad-notification-icon" />
            </Link>
            <span className="ad-badge">3</span>
          </div>
          <div className="ad-user-profile">
            <FaUserCircle className="ad-profile-icon" />
            <span className="ad-username">Admin</span>
            <div className="ad-dropdown-menu">
              <button onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </header>

      <div className="ad-dashboard-container">
        <nav className="ad-sidebar">
          <div className="ad-sidebar-header">
            <h2>Admin Menu</h2>
          </div>
          <ul className="ad-sidebar-menu">
            <li className="ad-active">
              <FaTachometerAlt className="ad-icon" />
              <span>Dashboard</span>
            </li>
            <li>
              <Link to="/userdetails">
                <FaUsers className="ad-icon" />
                <span>Users</span>
              </Link>
            </li>
            <li>
              <Link to="/users" state={{ showGridView: true }}>
                <FaUserCircle className="ad-icon" />
                <span>Profiles</span>
              </Link>
            </li>
            <li>
              <Link to="/notificationdetails">
                <FaBell className="ad-icon" />
                <span>Annoucements</span>
              </Link>
            </li>
            <li>
              <Link to="/passworddetails">
                <FaHandshake className="ad-icon" />
                <span>Request</span>
              </Link>
            </li>
            <li>
              <Link to="/helpcenter">
                <FaQuestionCircle className="ad-icon" />
                <span>Help & Center</span>
              </Link>
            </li>
            <li onClick={handleLogout}>
              <FaSignOutAlt className="ad-icon" />
              <span>Logout</span>
            </li>
          </ul>
        </nav>

        <main className="ad-main-content">
          <section className="ad-stats-section">
            <div className="ad-stat-card blue">
              <h3>Total Users</h3>
              <p>{loading ? 'Loading...' : totalUsers}</p>
              <FaUserCircle className="ad-stat-icon" />
            </div>
            <div className="ad-stat-card green">
              <h3>Active Projects</h3>
              <p>24</p>
              <FaTachometerAlt className="ad-stat-icon" />
            </div>
            <div className="ad-stat-card orange">
              <h3>Pending Requests</h3>
              <p>{loading ? 'Loading...' : pendingRequests}</p>
              <FaHandshake className="ad-stat-icon" />
            </div>
            <div className="ad-stat-card red">
              <h3>Issues Reported</h3>
              <p>8</p>
              <FaExclamationCircle className="ad-stat-icon" />
            </div>
          </section>

          <section className="ad-charts-section">
            <div className="ad-chart-container">
              <h3>User Role Distribution</h3>
              <PieChart width={300} height={300}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>

            <div className="ad-chart-container">
              <h3>Users vs Projects</h3>
              <BarChart
                width={500}
                height={300}
                data={barData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="users" fill="#8884d8" />
                <Bar dataKey="projects" fill="#82ca9d" />
              </BarChart>
            </div>
          </section>

          <section className="ad-recent-activity">
            <h3>Recent Activities</h3>
            <div className="ad-activity-list">
              {loading ? (
                <p>Loading recent activities...</p>
              ) : recentUsers.length > 0 ? (
                recentUsers.map((user, index) => (
                  <div key={index} className="ad-activity-item">
                    <div className="ad-activity-icon">
                      <FaUserCircle />
                    </div>
                    <div className="ad-activity-details">
                      <p>New user registered - {user.name}</p>
                      <small>{getTimeAgo(user.createdAt)}</small>
                    </div>
                  </div>
                ))
              ) : (
                <p>No recent user activities found.</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;