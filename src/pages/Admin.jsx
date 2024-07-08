import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactCard from "../components/ContactCard";
import LinearProgress from "@mui/material/LinearProgress";
import "../assets/styles/Admin.css";

const Admin = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data } = await axios.get(
          "https://contact-page-backend.onrender.com/api/v1/admin/Contacts"
        );

        // Filter contacts based on active filter and status conditions
        const filteredData = data.filter(
          (item) =>
            (activeFilter === "All" || item.topic === activeFilter) &&
            item.status !== "Resolved" &&
            item.topic !== "Feedback"
        );

        setContacts(filteredData);
      } catch (error) {
        console.error("Error fetching contacts:", error.message);
      } finally {
        setIsLoading(false); // Update loading state once data (and filtering) is complete
      }
    };

    fetchContacts(); // Initial fetch when component mounts or activeFilter changes
  }, [activeFilter, contacts]);

  const handleFilterChange = (topic) => {
    setActiveFilter(topic);
  };

  return (
    <div className="App">
      <h1>All Contact Details</h1>
      <div className="FilterButtons">
        {["All", "Inquiry", "Report Bug", "Support", "Other"].map((topic) => (
          <button
            key={topic}
            className={activeFilter === topic ? "active" : ""}
            onClick={() => handleFilterChange(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
      {isLoading ? (
        <LinearProgress /> // Show loading indicator while fetching data
      ) : contacts.length === 0 ? (
        <div className="NoContactsMessage">
          Nothing to work on {activeFilter}
        </div>
      ) : (
        <div className="ContactContainer">
          {contacts.map((contact) => (
            <ContactCard
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

export default Admin;
