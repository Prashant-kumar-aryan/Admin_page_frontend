import React from "react";
import "../assets/styles/Admin.css";

const ResolvedCard = ({ name, email, phoneNumber, topic, message }) => {
  return (
    <div className="card">
      <div className="row">
        <div className="label">
          <strong>Name:</strong>
        </div>
        <div className="value">{name}</div>
      </div>
      <div className="row">
        <div className="label">
          <strong>Phone:</strong>
        </div>
        <div className="value">{phoneNumber}</div>
      </div>
      <div className="row">
        <div className="label">
          <strong>Email:</strong>
        </div>
        <div className="value">{email}</div>
      </div>
      <div className="row">
        <div className="label">
          <strong>Status:</strong>
        </div>
        <div className="value">
          <div className="status-buttons">
            <button
              className={"status-button Resolved"}
              style={{
                backgroundColor: "#13aa52",
              }}
            >
              Resolved
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="label">
          <strong>Topic:</strong>
        </div>
        <div className="value">{topic}</div>
      </div>
      <div className="row">
        <div className="label">
          <strong>Message:</strong>
        </div>
        <div className="value">{message}</div>
      </div>
    </div>
  );
};

export default ResolvedCard;
