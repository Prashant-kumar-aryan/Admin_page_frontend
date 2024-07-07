import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Header.css";

const Header = () => {
  return (
    <nav className="header">
      <ul className="link-container">
        <li>
          <Link to="/">Contacts</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/resolved">Resolved</Link>
        </li>
        <li>
          <Link to="/feedback">Feedback</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
