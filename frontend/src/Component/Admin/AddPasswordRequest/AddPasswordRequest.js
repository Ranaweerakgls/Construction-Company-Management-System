import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddPasswordRequest.css';
import Nav from "../../topnav/mainnav/nav"

function AddPasswordRequest() {
  const [formData, setFormData] = useState({
    passwordid: '',
    email: '',
    userid: '',
    phoneNumber: '',
    question1: '',
    question2: '',
    reason: '',
  });
  const [verificationCode, setVerificationCode] = useState('');
  const [serverCode, setServerCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const navigate = useNavigate();

  const reasons = [
    'Forgot Password',
    'Account Locked',
    'Security Concern',
    'Password Expired',
    'Other Issue',
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data.users || []);
        setIsLoadingUsers(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setErrors((prev) => ({
          ...prev,
          users: 'Failed to fetch users. Please try again later.',
        }));
        setIsLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const generatePasswordId = () => {
      return `PWD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    };
    setFormData((prev) => ({
      ...prev,
      passwordid: generatePasswordId(),
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
    setErrors({ ...errors, verificationCode: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!formData.passwordid) {
      newErrors.passwordid = 'Password ID is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!verificationCode) {
      newErrors.verificationCode = 'Verification code is required';
    }
    if (!formData.userid) {
      newErrors.userid = 'User ID is required';
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }
    if (!formData.reason) {
      newErrors.reason = 'Please select a reason';
    }

    if (formData.email && formData.userid) {
      const userMatch = users.find(
        (user) =>
          user.email.toLowerCase() === formData.email.toLowerCase() &&
          user.userid.toLowerCase() === formData.userid.toLowerCase()
      );
      if (!userMatch) {
        newErrors.userMatch =
          'The email and user ID do not match any registered user. Please check your inputs.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendVerificationEmail = async () => {
    if (!formData.email) {
      setErrors({ ...errors, email: 'Email is required to send verification code' });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors({ ...errors, email: 'Please enter a valid email address' });
      return;
    }

    // Check if email exists in registered users
    const userMatch = users.find(
      (user) => user.email.toLowerCase() === formData.email.toLowerCase()
    );
    if (!userMatch) {
      setErrors({ ...errors, email: 'This email is not registered. Please use a registered email.' });
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/Password/verify-email', {
        email: formData.email,
      });
      setServerCode(response.data.code);
      alert('Verification code sent to your email!');
    } catch (error) {
      console.error('Error sending verification email:', error);
      alert('Failed to send verification code. Please try again.');
    }
  };

  const verifyCode = () => {
    if (!verificationCode) {
      setErrors({ ...errors, verificationCode: 'Verification code is required' });
      return;
    }
    if (verificationCode === serverCode) {
      setIsEmailVerified(true);
      alert('Email verified successfully!');
    } else {
      setIsEmailVerified(false);
      alert('Invalid verification code. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!isEmailVerified) {
      alert('Please verify your email before submitting the form.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/Password', {
        passwordid: String(formData.passwordid),
        email: String(formData.email),
        userid: String(formData.userid),
        phoneNumber: Number(formData.phoneNumber),
        question1: String(formData.question1),
        question2: String(formData.question2),
        reason: String(formData.reason),
      });
      alert('Password reset request added successfully!');
      setFormData({
        passwordid: '',
        email: '',
        userid: '',
        phoneNumber: '',
        question1: '',
        question2: '',
        reason: '',
      });
      setVerificationCode('');
      setServerCode('');
      setIsEmailVerified(false);
      navigate('/login');
    } catch (error) {
      console.error('Error adding password reset request:', error);
      alert('Failed to add password reset request. Please try again.');
    }
  };

  if (isLoadingUsers) {
    return <div className="add-password-loading">Loading...</div>;
  }

  if (errors.users) {
    return <div className="add-password-error">{errors.users}</div>;
  }

  return (
    <div>
      <Nav/>
      <div className="add-password-container">
        <h1 className="add-password-heading">Add Password Reset Request</h1>
        <form className="add-password-form" onSubmit={handleSubmit}>
          <div className="add-password-field">
            <label className="add-password-label">Request ID:</label>
            <input
              type="text"
              name="passwordid"
              value={formData.passwordid}
              onChange={handleChange}
              className="add-password-input"
              readOnly
              required
            />
            {errors.passwordid && <span className="add-password-error">{errors.passwordid}</span>}
          </div>
          <div className="add-password-field">
            <label className="add-password-label">Email:</label>
            <div className="add-password-email-field">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="add-password-input"
                required
              />
              <button
                type="button"
                className="add-password-action-button"
                onClick={sendVerificationEmail}
              >
                Send Code
              </button>
            </div>
            {errors.email && <span className="add-password-error">{errors.email}</span>}
          </div>
          <div className="add-password-field">
            <label className="add-password-label">Verification Code:</label>
            <div className="add-password-verification-field">
              <input
                type="text"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
                placeholder="Enter the code sent to your email"
                className="add-password-input"
                required
              />
              <button type="button" className="add-password-action-button" onClick={verifyCode}>
                Verify Code
              </button>
            </div>
            {errors.verificationCode && (
              <span className="add-password-error">{errors.verificationCode}</span>
            )}
          </div>
          <div className="add-password-field">
            <label className="add-password-label">User ID:</label>
            <input
              type="text"
              name="userid"
              value={formData.userid}
              onChange={handleChange}
              className="add-password-input"
              required
            />
            {errors.userid && <span className="add-password-error">{errors.userid}</span>}
          </div>
          <div className="add-password-field">
            <label className="add-password-label">Phone Number:</label>
            <input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="add-password-input"
              required
            />
            {errors.phoneNumber && <span className="add-password-error">{errors.phoneNumber}</span>}
          </div>
          <div className="add-password-field">
            <label className="add-password-label">Reason:</label>
            <select
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="add-password-select"
              required
            >
              <option value="">Select a reason</option>
              {reasons.map((reason, index) => (
                <option key={index} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
            {errors.reason && <span className="add-password-error">{errors.reason}</span>}
          </div>
          {errors.userMatch && <span className="add-password-error">{errors.userMatch}</span>}
          <button type="submit" className="add-password-button">
            Add Password Reset Request
          </button>
          <p className="add-password-message">
            *Kindly check your email inbox (including the spam/junk folder) for further instructions to complete the process. If you do not receive an email within a few minutes, please contact our support team for assistance.
          </p>
        </form>
      </div>
    </div>
  );
}

export default AddPasswordRequest;