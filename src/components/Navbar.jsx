import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaCar, FaPlus, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <FaCar className="logo-icon" />
          <span>Car</span>
        </Link>

        <button className="navbar-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <li className="navbar-item">
            <Link
              to="/"
              className={`navbar-link ${location.pathname === "/" ? "active" : ""}`}
              onClick={closeMenu}
            >
              <FaCar />
              <span>Mashinalar</span>
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              to="/add"
              className={`navbar-link add-btn ${location.pathname === "/add" ? "active" : ""}`}
              onClick={closeMenu}
            >
              <FaPlus />
              <span>Qo'shish</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;