import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles/Admin.css";
import ResolvedCard from "../components/ResolvedCard.jsx";
import LinearProgress from "@mui/material/LinearProgress";

const Resolved = () => {
  const [resolvedContacts, setResolvedContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResolvedContacts = async () => {
      try {
        const { data } = await axios.get(
          "https://contact-page-backend.onrender.com/api/v1/admin/Contacts"
        );
        const resolvedContacts = data.filter(
          (contact) => contact.status === "Resolved"
        );
        setTimeout(() => {
          setResolvedContacts(resolvedContacts);
          setIsLoading(false);
        }, 2000); // Simulate a minimum loading time of 2 seconds
      } catch (error) {
        console.error("Error fetching resolved contacts:", error.message);
        setIsLoading(false); // Ensure loading state is turned off in case of error
      }
    };
    fetchResolvedContacts();
  }, []);

  return (
    <div className="App dark">
      <h1>Resolved Contacts</h1>
      {isLoading && <LinearProgress />}{" "}
      {/* Show LinearProgress while loading */}
      {!isLoading && resolvedContacts.length === 0 && (
        <p className="NoContactsMessage">No resolved contacts found</p>
      )}{" "}
      {/* Show a message if there are no resolved contacts */}
      {!isLoading && resolvedContacts.length > 0 && (
        <div className="ContactContainer">
          {resolvedContacts.map((contact) => (
            <ResolvedCard
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

export default Resolved;
