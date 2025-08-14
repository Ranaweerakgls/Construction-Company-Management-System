import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import pic5 from '../pictures/pic5.jpg'; // ✅ Import the background image

function FeedbackUpdateForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ feedback: '', Date: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/feedback/${id}`);
        const data = response.data.user;

        if (!data || !data.feedback || !data.Date) {
          alert("Invalid feedback data format");
          return;
        }

        const formattedDate = new Date(data.Date).toISOString().split('T')[0];

        setInputs({
          feedback: data.feedback,
          Date: formattedDate,
        });
      } catch (error) {
        console.error('Error fetching feedback:', error);
        alert('Failed to load feedback data.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/feedback/${id}`, {
        feedback: inputs.feedback,
        Date: inputs.Date,
      });
      alert('Feedback updated successfully!');
      navigate('/feedbacks');
    } catch (error) {
      console.error('Error updating feedback:', error.response?.data || error.message);
      alert('Failed to update feedback.');
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundImage: `url(${pic5})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <div
        className="p-4 shadow rounded-lg"
        style={{
          maxWidth: '500px',
          margin: '0 auto',
          backgroundColor: 'rgba(255, 255, 255, 0.95)', // Slightly transparent white background
        }}
      >
        <h2 className="text-center mb-4" style={{ color: '#0d6efd' }}>
          Update Feedback
        </h2>
        <form onSubmit={handleSubmit} autoComplete="off">
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
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default FeedbackUpdateForm;
