import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/Admin.css";
import LinearProgress from "@mui/material/LinearProgress"; // Import LinearProgress
import FeedbackCard from "../components/FeedbackCard.jsx";

const Feedback = () => {
  const [resolvedContacts, setResolvedContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbackContacts = async () => {
      try {
        const { data } = await axios.get(
          "https://contact-page-backend.onrender.com/api/v1/admin/Contacts" // Adjust endpoint as necessary
        );
        const resolvedContacts = data.filter(
          (contact) => contact.status === "Feedback"
        );
        setResolvedContacts(resolvedContacts);
        // Simulate a minimum loading time of 2 seconds
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching resolved contacts:", error.message);
        setIsLoading(false);
      }
    };
    fetchFeedbackContacts();
  }, []);

  return (
    <div className="App dark">
      <h1>Feedback</h1>
      {isLoading ? (
        <LinearProgress /> // Show LinearProgress while loading
      ) : resolvedContacts.length === 0 ? (
        <p className="NoContactsMessage">No feedbacks</p> // Show message if resolvedContacts array is empty
      ) : (
        <div className="ContactContainer">
          {resolvedContacts.map((contact) => (
            <FeedbackCard
              key={contact._id}
              id={contact._id}
              name={contact.name}
              email={contact.email}
              phoneNumber={contact.phoneNumber}
              topic={contact.topic}
              status={contact.status}
              message={contact.message}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feedback;
