import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import pic5 from '../pictures/pic5.jpg'; // Ensure path is correct

function Feedbackform() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ feedback: "", Date: "" });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/feedback", {
        feedback: inputs.feedback,
        Date: inputs.Date ? new Date(inputs.Date).toISOString() : null,
      });
      alert("Feedback added!");
      navigate("/feedbacks");
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to add feedback.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${pic5})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        className="bg-white p-4 rounded-lg"
        style={{
          maxWidth: '500px',
          width: '100%',
          opacity: 0.95,
          border: '1px solid #ccc',
        }}
      >
        <h2 className="text-center text-primary mb-4">Submit New Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="feedback" className="form-label">Feedback</label>
            <input
              type="text"
              id="feedback"
              name="feedback"
              value={inputs.feedback}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Date" className="form-label">Date</label>
            <input
              type="date"
              id="Date"
              name="Date"
              value={inputs.Date}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Feedbackform;
