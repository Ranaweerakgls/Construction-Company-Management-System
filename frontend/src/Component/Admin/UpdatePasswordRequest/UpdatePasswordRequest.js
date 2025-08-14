import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdatePasswordRequest() {
  const [inputs, setInputs] = useState({
    passwordid: '',
    email: '',
    userid: '',
    phoneNumber: '',
    question1: '',
    question2: '',
    reason: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`http://localhost:5000/Password/${id}`);
        const passwordReset = res.data.password; // Adjust based on backend response structure
        if (!passwordReset) {
          throw new Error('Password reset request not found');
        }
        setInputs({
          passwordid: passwordReset.passwordid || '',
          email: passwordReset.email || '',
          userid: passwordReset.userid || '',
          phoneNumber: passwordReset.phoneNumber || '',
          question1: passwordReset.question1 || '',
          question2: passwordReset.question2 || '',
          reason: passwordReset.reason || '',
        });
      } catch (err) {
        console.error('Error fetching password reset request:', err);
        setError('Failed to load password reset request. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchHandler();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendRequest = async () => {
    const updatedData = {
      passwordid: String(inputs.passwordid),
      email: String(inputs.email),
      userid: String(inputs.userid),
      phoneNumber: Number(inputs.phoneNumber),
      question1: String(inputs.question1),
      question2: String(inputs.question2),
      reason: String(inputs.reason),
    };
    const res = await axios.put(`http://localhost:5000/Password/${id}`, updatedData);
    return res.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendRequest();
      alert('Password reset request updated successfully!');
      navigate('/passworddetails');
    } catch (error) {
      console.error('Error updating password reset request:', error);
      alert('Failed to update password reset request. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading password reset request...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Update Password Reset Request</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Password ID:</label>
          <input
            type="text"
            name="passwordid"
            value={inputs.passwordid}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>User ID:</label>
          <input
            type="text"
            name="userid"
            value={inputs.userid}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="number"
            name="phoneNumber"
            value={inputs.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Question 1:</label>
          <input
            type="text"
            name="question1"
            value={inputs.question1}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Question 2:</label>
          <input
            type="text"
            name="question2"
            value={inputs.question2}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Reason:</label>
          <input
            type="text"
            name="reason"
            value={inputs.reason}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <button type="submit">Update Password Reset Request</button>
      </form>
    </div>
  );
}

export default UpdatePasswordRequest;
