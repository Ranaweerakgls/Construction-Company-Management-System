import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddNotification.css';
import AdNav from "../NavAdmin/NavAdmin";

function AddNotification() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    notificationid: '',
    type: '',
    Date: '',
    message: '',
    Priority_Level: '',
    Target_Audience: 'allusers',
  });
  const [errors, setErrors] = useState({});

  const types = ['Annoucement', 'Alert', 'Update'];
  const priorityLevels = ['Low', 'Medium', 'High', 'Critical'];
  const targetAudiences = [
    'allusers',
    'admin',
    'projectmanager',
    'client',
    'sitesupervisor',
    'quantitysurveyor',
    'inventorymanager',
  ];

  useEffect(() => {
    const generateNotificationId = () => {
      return `NOTIF-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    };
    setInputs((prev) => ({
      ...prev,
      notificationid: generateNotificationId(),
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!inputs.notificationid) {
      newErrors.notificationid = 'Notification ID is required';
    }
    if (!inputs.type) {
      newErrors.type = 'Type is required';
    } else if (!types.includes(inputs.type)) {
      newErrors.type = 'Type must be one of: Annoucement, Alert, Update';
    }
    if (!inputs.Date) {
      newErrors.Date = 'Date is required';
    }
    if (!inputs.message) {
      newErrors.message = 'Message is required';
    } else if (inputs.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }
    if (!inputs.Priority_Level) {
      newErrors.Priority_Level = 'Priority Level is required';
    } else if (!priorityLevels.includes(inputs.Priority_Level)) {
      newErrors.Priority_Level = 'Priority Level must be one of: Low, Medium, High, Critical';
    }
    if (!inputs.Target_Audience) {
      newErrors.Target_Audience = 'Target Audience is required';
    } else if (!targetAudiences.includes(inputs.Target_Audience)) {
      newErrors.Target_Audience =
        'Target Audience must be one of: allusers, admin, projectmanager, client, sitesupervisor, quantitysurveyor, inventorymanager';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await axios.post('http://localhost:5000/Notification', {
        notificationid: inputs.notificationid,
        type: inputs.type,
        Date: new Date(inputs.Date).toISOString(),
        message: inputs.message,
        Priority_Level: inputs.Priority_Level,
        Target_Audience: inputs.Target_Audience,
      });
      alert('Notification Added Successfully!');
      setInputs({
        notificationid: '',
        type: '',
        Date: '',
        message: '',
        Priority_Level: '',
        Target_Audience: 'allusers',
      });
      navigate('/notificationdetails');
    } catch (error) {
      console.error('Error adding notification:', error);
      alert('Failed to add notification');
    }
  };

  return (
    <div className="add-notification-container">
      <AdNav/>
      <h1 className="add-notification-heading">Add Notification</h1>
      <form className="add-notification-form" onSubmit={handleSubmit}>
        <div className="add-notification-field">
          <label className="add-notification-label">Notification ID:</label>
          <input
            type="text"
            name="notificationid"
            value={inputs.notificationid}
            onChange={handleChange}
            className="add-notification-input"
            readOnly
            required
          />
          {errors.notificationid && (
            <span className="add-notification-error">{errors.notificationid}</span>
          )}
        </div>
        <div className="add-notification-field">
          <label className="add-notification-label">Type:</label>
          <select
            name="type"
            value={inputs.type}
            onChange={handleChange}
            className="add-notification-select"
            required
          >
            <option value="">Select Type</option>
            {types.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.type && <span className="add-notification-error">{errors.type}</span>}
        </div>
        <div className="add-notification-field">
          <label className="add-notification-label">Date:</label>
          <input
            type="date"
            name="Date"
            value={inputs.Date}
            onChange={handleChange}
            className="add-notification-input"
            required
          />
          {errors.Date && <span className="add-notification-error">{errors.Date}</span>}
        </div>
        <div className="add-notification-field">
          <label className="add-notification-label">Message:</label>
          <textarea
            name="message"
            value={inputs.message}
            onChange={handleChange}
            className="add-notification-textarea"
            required
          />
          {errors.message && <span className="add-notification-error">{errors.message}</span>}
        </div>
        <div className="add-notification-field">
          <label className="add-notification-label">Priority Level:</label>
          <select
            name="Priority_Level"
            value={inputs.Priority_Level}
            onChange={handleChange}
            className="add-notification-select"
            required
          >
            <option value="">Select Priority Level</option>
            {priorityLevels.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.Priority_Level && (
            <span className="add-notification-error">{errors.Priority_Level}</span>
          )}
        </div>
        <div className="add-notification-field">
          <label className="add-notification-label">Target Audience:</label>
          <select
            name="Target_Audience"
            value={inputs.Target_Audience}
            onChange={handleChange}
            className="add-notification-select"
            required
          >
            <option value="">Select Target Audience</option>
            {targetAudiences.map((audience, index) => (
              <option key={index} value={audience}>
                {audience}
              </option>
            ))}
          </select>
          {errors.Target_Audience && (
            <span className="add-notification-error">{errors.Target_Audience}</span>
          )}
        </div>
        <button type="submit" className="add-notification-button">
          Add Notification
        </button>
      </form>
    </div>
  );
}

export default AddNotification;