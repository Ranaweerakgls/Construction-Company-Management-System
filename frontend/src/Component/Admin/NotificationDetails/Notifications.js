import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Notification from '../Notification/Notification';
import './Notifications.css';
import AdNav from "../NavAdmin/NavAdmin";

const URL = "http://localhost:5000/Notification";

const fetchHandler = async () => {
  try {
    const res = await axios.get(URL);
    return res.data;
  } catch (err) {
    console.error("Error fetching notifications:", err);
    return { notification: [] };
  }
};

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = () => {
    setLoading(true);
    fetchHandler().then((data) => {
      setNotifications(data.notification || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const deleteNotification = async (id) => {
    if (window.confirm("Are you sure you want to delete this notification?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        fetchNotifications();
      } catch (err) {
        console.error("Error deleting notification:", err);
        alert("Failed to delete notification. Please try again.");
      }
    }
  };

  return (
    <div>
        <AdNav/>
    <div className="notifications-page">
      <div className="notifications-header">
        <h1>System Announcements</h1>
        <Link to="/addnotification" className="add-notify-button">
          Add Notification
        </Link>
      </div>
      {loading ? (
        <p>Loading notifications...</p>
      ) : (
        <table className="notifications-table">
          <thead>
            <tr>
             
              <th>Notification ID</th>
              <th>Type</th>
              <th>Date</th>
              <th>Message</th>
              <th>Priority Level</th>
              <th>Target Audience</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications.length > 0 ? (
              notifications.map((notification, i) => (
                <Notification
                  key={i}
                  notification={notification}
                  deleteNotification={deleteNotification}
                />
              ))
            ) : (
              <tr>
                <td colSpan="8">No notifications found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>

    </div>
    
  );
}

export default Notifications;