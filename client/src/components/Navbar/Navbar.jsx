
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    
    <nav className="navbar">
      <div className="nav-container">

        <h3 className='forum-regular logo'>Q<span>Start</span></h3>
      <ul className="navbar-nav">
        <li className="nav-item ">
          <Link to="/" className="nav-link link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/create" className="nav-link link">Create </Link>
        </li>
        <li className="nav-item">
          <Link to="/play" className="nav-link link">Play</Link>
        </li>
      </ul>
      </div>
    </nav>
  );
};

export default Navbar;
