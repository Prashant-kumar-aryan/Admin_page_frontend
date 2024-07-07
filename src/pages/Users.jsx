import React, { useEffect, useState } from "react";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import "../assets/styles/Users.css";

const Users = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          "https://contact-page-backend.onrender.com/api/v1/admin/Users"
        );
        // Simulate a minimum loading time of 0.5 second
        setTimeout(() => {
          setContacts(data);
          setIsLoading(false);
        }, 500); // 500 milliseconds = 0.5 second
      } catch (error) {
        console.error("Error fetching users:", error.message);
        setIsLoading(false);
      }
    };

    if (contacts.length === 0) {
      fetchUsers();
    }
  }, [contacts]);

  return (
    <div className="App">
      <h1>All Users Details</h1>
      {isLoading ? (
        <LinearProgress /> // Show LinearProgress while loading
      ) : (
        <div className="ContactContainer">
          {contacts.length === 0 ? (
            <p className="NoContactsMessage">No users found</p>
          ) : (
            contacts.map((contact) => (
              <UserCard
                key={contact._id}
                id={contact._id}
                name={contact.name}
                email={contact.email}
                phoneNumber={contact.phone}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

const UserCard = ({ id, name, email, phoneNumber }) => {
  return (
    <div className="card">
      <div className="row">
        <span>
          <strong>Name:</strong> {name}
        </span>
        <span>
          <strong>Phone:</strong> {phoneNumber}
        </span>
        <span>
          <strong>Email:</strong> {email}
        </span>
      </div>
    </div>
  );
};

export default Users;
