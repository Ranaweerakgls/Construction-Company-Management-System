import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FeedbackTable({ feedbackusers, setfeedbackusers }) {
  const navigate = useNavigate();

  const handleUpdate = (id) => {
    navigate(`/update-feedback/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this feedback?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/feedback/${id}`);
      setfeedbackusers((prev) => prev.filter((user) => user._id !== id));
      alert("Feedback deleted successfully!");
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert("Failed to delete the feedback.");
    }
  };

  return (
    <table
      border="1"
      cellPadding="10"
      cellSpacing="0"
      style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
    >
      <thead>
        <tr>
          <th>Feedback</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {feedbackusers.length > 0 ? (
          feedbackusers.map((user) => (
            <tr key={user._id}>
              <td>{user.feedback}</td>
              <td>{new Date(user.Date).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => handleUpdate(user._id)}
                  style={{ backgroundColor: "#008CBA", color: "white", marginRight: "5px" }}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3" style={{ textAlign: "center" }}>No Feedbacks found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default FeedbackTable;
