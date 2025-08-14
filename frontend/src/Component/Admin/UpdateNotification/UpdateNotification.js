import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateNotification.css'; // Import the unique CSS file
import AdNav from "../NavAdmin/NavAdmin";

function UpdateNotification() {
  const [inputs, setInputs] = useState({
    notificationid: '',
    type: '',
    Date: '',
    message: '',
    Priority_Level: '',
    Target_Audience: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching notification with ID:', id);
        const res = await axios.get(`http://localhost:5000/Notification/${id}`);
        console.log('API Response:', res.data);

        const notification = res.data.notification || res.data;
        if (!notification || Object.keys(notification).length === 0) {
          throw new Error('Notification not found or empty response');
        }

        const formattedDate = notification.Date
          ? new Date(notification.Date).toISOString().split('T')[0]
          : '';
        setInputs({
          notificationid: notification.notificationid || '',
          type: notification.type || '',
          Date: formattedDate,
          message: notification.message || '',
          Priority_Level: notification.Priority_Level || '',
          Target_Audience: notification.Target_Audience || '',
        });
      } catch (err) {
        console.error('Error fetching notification:', err);
        setError(err.response?.data?.message || 'Failed to load notification. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    const isoDate = inputs.Date ? new Date(inputs.Date).toISOString() : '';
    const updatedData = {
      notificationid: String(inputs.notificationid),
      type: String(inputs.type),
      Date: isoDate,
      message: String(inputs.message),
      Priority_Level: String(inputs.Priority_Level),
      Target_Audience: String(inputs.Target_Audience),
    };
    const res = await axios.put(`http://localhost:5000/Notification/${id}`, updatedData);
    return res.data;
  };

  const validateForm = () => {
    const newErrors = {};

    // Notification ID: Must be a string with at least 3 characters
    if (!inputs.notificationid || inputs.notificationid.length < 3) {
      newErrors.notificationid = 'Notification ID must be at least 3 characters long';
    }

    // Type: Must be a string with at least 2 characters
    if (!inputs.type || inputs.type.length < 2) {
      newErrors.type = 'Type must be at least 2 characters long';
    }

    // Date: Must be a valid date and not in the future
    if (!inputs.Date) {
      newErrors.Date = 'Date is required';
    } else {
      const selectedDate = new Date(inputs.Date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time for comparison
      if (selectedDate > today) {
        newErrors.Date = 'Date cannot be in the future';
      }
    }

    // Message: Must be at least 10 characters
    if (!inputs.message || inputs.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    // Priority Level: Must be one of 'Low', 'Medium', 'High'
    const validPriorities = ['Low', 'Medium', 'High'];
    if (!inputs.Priority_Level || !validPriorities.includes(inputs.Priority_Level)) {
      newErrors.Priority_Level = 'Priority Level must be Low, Medium, or High';
    }

    // Target Audience: Must be at least 3 characters
    if (!inputs.Target_Audience || inputs.Target_Audience.length < 3) {
      newErrors.Target_Audience = 'Target Audience must be at least 3 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for the field when user starts typing
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await sendRequest();
        navigate('/notificationdetails');
      } catch (error) {
        console.error('Error updating notification:', error);
        alert('Failed to update notification. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="un-loading">Loading notification...</div>;
  }

  if (error) {
    return <div className="un-error">{error}</div>;
  }

  return (
    <div>
      <AdNav/>
      <div className="un-update-notification">
      <h1 className="un-title">Update Notification</h1>
      <form className="un-form" onSubmit={handleSubmit}>
        <div className="un-form-group">
          <label htmlFor="notificationid">Notification ID:</label>
          <input
            type="text"
            id="notificationid"
            name="notificationid"
            value={inputs.notificationid}
            onChange={handleChange}
            required
            minLength="3"
          />
          {errors.notificationid && <span className="un-error-message">{errors.notificationid}</span>}
        </div>
        <div className="un-form-group">
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={inputs.type}
            onChange={handleChange}
            required
            minLength="2"
          />
          {errors.type && <span className="un-error-message">{errors.type}</span>}
        </div>
        <div className="un-form-group">
          <label htmlFor="Date">Date:</label>
          <input
            type="date"
            id="Date"
            name="Date"
            value={inputs.Date}
            onChange={handleChange}
            required
            max={new Date().toISOString().split('T')[0]} // Prevent future dates
          />
          {errors.Date && <span className="un-error-message">{errors.Date}</span>}
        </div>
        <div className="un-form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={inputs.message}
            onChange={handleChange}
            required
            minLength="10"
          />
          {errors.message && <span className="un-error-message">{errors.message}</span>}
        </div>
        <div className="un-form-group">
          <label htmlFor="Priority_Level">Priority Level:</label>
          <select
            id="Priority_Level"
            name="Priority_Level"
            value={inputs.Priority_Level}
            onChange={handleChange}
            required
          >
            <option value="">Select Priority Level</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.Priority_Level && <span className="un-error-message">{errors.Priority_Level}</span>}
        </div>
        <div className="un-form-group">
          <label htmlFor="Target_Audience">Target Audience:</label>
          <input
            type="text"
            id="Target_Audience"
            name="Target_Audience"
            value={inputs.Target_Audience}
            onChange={handleChange}
            required
            minLength="3"
          />
          {errors.Target_Audience && <span className="un-error-message">{errors.Target_Audience}</span>}
        </div>
        <button type="submit" className="un-submit-button">Update Notification</button>
      </form>
    </div>

    </div>
    
  );
}

export default UpdateNotification;