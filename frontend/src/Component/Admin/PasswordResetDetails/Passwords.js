import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PasswordResets from '../PasswordReset/PasswordResets';
import './Passwords.css';
import AdNav from "../NavAdmin/NavAdmin";

const URL = "http://localhost:5000/Password";

const fetchHandler = async () => {
  try {
    const res = await axios.get(URL);
    console.log('Fetched password reset details:', res.data);
    return res.data;
  } catch (err) {
    console.error("Error fetching password reset details:", err);
    return { passwords: [] };
  }
};

function Passwords() {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPasswords = () => {
    setLoading(true);
    fetchHandler().then((data) => {
      setPasswords(data.passwords || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const deletePasswordReset = async (id) => {
    if (window.confirm("Are you sure you want to delete this password reset request?")) {
      try {
        await axios.delete(`${URL}/${id}`);
        fetchPasswords();
      } catch (err) {
        console.error("Error deleting password reset request:", err);
        alert("Failed to delete password reset request. Please try again.");
      }
    }
  };

  const sendEmail = async (id) => {
    if (window.confirm("Are you sure you want to send an email to this user?")) {
      try {
        await axios.post(`${URL}/send-email/${id}`);
        alert("Email sent successfully!");
      } catch (err) {
        console.error("Error sending email:", err);
        alert("Failed to send email. Please try again.");
      }
    }
  };

  return (
    <div className="passwords-page">
      <AdNav/>
      <div className="passwords-container">
        <h1 className="passwords-heading">Password Reset Requests</h1>
        {loading ? (
          <p className="passwords-loading">Loading password reset details...</p>
        ) : (
          <>
            <table className="passwords-table">
              <thead>
                <tr>
                  <th className="passwords-table-th">Password ID</th>
                  <th className="passwords-table-th">Email</th>
                  <th className="passwords-table-th">User ID</th>
                  <th className="passwords-table-th">Phone Number</th>
                  <th className="passwords-table-th">Reason</th>
                  <th className="passwords-table-th">Created At</th>
                  <th className="passwords-table-th">Action</th>
                </tr>
              </thead>
              <tbody>
                {passwords.length > 0 ? (
                  passwords.map((passwordReset, i) => (
                    <PasswordResets
                      key={i}
                      passwordReset={passwordReset}
                      deletePasswordReset={deletePasswordReset}
                      sendEmail={sendEmail}
                    />
                  ))
                ) : (
                  <tr className="passwords-table-tr">
                    <td className="passwords-table-td" colSpan="7">No password reset details found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default Passwords;