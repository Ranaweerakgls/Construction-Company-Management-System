import React from "react";
import { Link } from "react-router-dom";
import "./PasswordResets.css";

function PasswordResets(props) {
  if (!props.passwordReset) {
    return (
      <tr className="password-resets-row">
        <td className="password-resets-invalid-cell" colSpan="7">
          Invalid password reset data
        </td>
      </tr>
    );
  }

  const {
    _id,
    passwordid,
    email,
    userid,
    phoneNumber,
    question1,
    question2,
    reason,
  } = props.passwordReset;

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString();
  };

  return (
    <tr className="password-resets-row">
      <td className="password-resets-cell">{passwordid || "N/A"}</td>
      <td className="password-resets-cell">{email || "N/A"}</td>
      <td className="password-resets-cell">{userid || "N/A"}</td>
      <td className="password-resets-cell">{phoneNumber || "N/A"}</td>
      <td className="password-resets-cell">{reason || "N/A"}</td>
      <td className="password-resets-cell">{getCurrentDate()}</td>
      <td className="password-resets-actions">
        {/* <Link to={`/updatepassword/${_id}`} className="password-resets-update-link"> 
          Update
        </Link>*/}
        <button
          onClick={() => props.deletePasswordReset(_id)}
          className="password-resets-action-button delete"
        >
          Reject
        </button>
        <button
          onClick={() => props.sendEmail(_id)}
          className="password-resets-action-button send-email"
        >
          Send Email
        </button>
      </td>
    </tr>
  );
}

export default PasswordResets;