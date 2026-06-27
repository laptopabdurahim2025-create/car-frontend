import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaCar,
  FaPlus,
  FaBars,
  FaTimes,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaUser,
  FaShieldAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logoutUser, isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logoutUser();
    closeMenu();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <FaCar className="logo-icon" />
          <span>Cars World</span>
        </Link>

        <div className="navbar-right">
          <ThemeToggle />
          <button className="navbar-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link
              to="/"
              className={`navbar-link ${location.pathname === "/" ? "active" : ""}`}
              onClick={closeMenu}
            >
              <FaCar /> <span>Mashinalar</span>
            </Link>
          </li>

          {user && (
            <li>
              <Link
                to="/add"
                className={`navbar-link add-btn ${location.pathname === "/add" ? "active" : ""}`}
                onClick={closeMenu}
              >
                <FaPlus /> <span>Qo'shish</span>
              </Link>
            </li>
          )}

          {isAdmin && (
            <li>
              <Link
                to="/admin"
                className={`navbar-link admin-btn ${location.pathname === "/admin" ? "active" : ""}`}
                onClick={closeMenu}
              >
                <FaShieldAlt /> <span>Admin</span>
              </Link>
            </li>
          )}

          {user ? (
            <>
              <li>
                <Link
                  to="/profile"
                  className={`navbar-link ${location.pathname === "/profile" ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  <FaUser /> <span>{user.username}</span>
                </Link>
              </li>
              <li>
                <button
                  className="navbar-link logout-btn"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt /> <span>Chiqish</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className={`navbar-link ${location.pathname === "/login" ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  <FaSignInAlt /> <span>Kirish</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={`navbar-link register-btn ${location.pathname === "/register" ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  <FaUserPlus /> <span>Ro'yxat</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
