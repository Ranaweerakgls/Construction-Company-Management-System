import React from 'react';
import { Link } from 'react-router-dom';

function Notification(props) {
  if (!props.notification) {
    return <tr><td colSpan="8">Invalid notification data</td></tr>;
  }

  const { _id, notificationid, type, Date: notificationDate, message, Priority_Level, Target_Audience } = props.notification;

  return (
    <tr>
      
      <td>{notificationid || 'N/A'}</td>
      <td>{type || 'N/A'}</td>
      <td>{notificationDate ? new Date(notificationDate).toLocaleDateString() : 'Invalid Date'}</td>
      <td>{message || 'N/A'}</td>
      <td>{Priority_Level || 'N/A'}</td>
      <td>{Target_Audience || 'N/A'}</td>
      <td>
        <div className="action-buttons">
          <Link to={`/notificationdetails/${_id}`}>
            Update
          </Link>
          <button onClick={() => props.deleteNotification(_id)}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default Notification;