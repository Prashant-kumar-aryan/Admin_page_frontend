import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import "../assets/styles/Admin.css";

const ContactCard = ({
  id,
  name,
  email,
  phoneNumber,
  topic,
  status,
  message,
}) => {
  // Function to handle status change
  const handleStatusChange = async (newStatus) => {
    // Check if the new status is "Pending" or if it's the same as current status
    if (newStatus === "Pending" || newStatus === status) {
      toast.error(`Cant update`);
      return;
    }

    // Show confirmation dialog
    const confirmed = window.confirm(`Change status to "${newStatus}"?`);
    if (!confirmed) {
      toast.error(`Cancelled`);
      return;
    }

    try {
      // Send PUT request to update status
      await axios.put(
        `https://contact-page-backend.onrender.com/api/v1/admin/update`,
        {
          id,
          newStatus,
        }
      );

      // Display success toast notification
      toast.success(`Status updated to ${newStatus} successfully!`);
    } catch (error) {
      // Display error toast notification on failure
      toast.error("Failed to update status!");
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="card">
      <Toaster position="top-right" />
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
              className={`status-button ${status === "Pending" && "active"}`}
              onClick={() => handleStatusChange("Pending")}
            >
              Pending
            </button>
            <button
              className={`status-button ${status === "InProgress" && "active"}`}
              onClick={() => handleStatusChange("InProgress")}
            >
              InProgress
            </button>
            <button
              className={`status-button ${status === "Resolved" && "active"}`}
              onClick={() => handleStatusChange("Resolved")}
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

export default ContactCard;
