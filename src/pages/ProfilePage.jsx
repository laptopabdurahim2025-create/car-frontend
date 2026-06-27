import React from "react";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaShieldAlt, FaCar, FaCalendarAlt } from "react-icons/fa";

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-avatar">
          {user.avatar ? (
            <img src={user.avatar} alt={user.username} />
          ) : (
            <div className="avatar-placeholder">
              {user.username.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <h1>{user.username}</h1>
        <span className={`role-badge ${user.role}`}>
          <FaShieldAlt /> {user.role === "admin" ? "Admin" : "Foydalanuvchi"}
        </span>
        <div className="profile-info-grid">
          <div className="profile-info-item">
            <FaUser />
            <div>
              <span className="label">Username</span>
              <span className="value">{user.username}</span>
            </div>
          </div>
          <div className="profile-info-item">
            <FaEnvelope />
            <div>
              <span className="label">Email</span>
              <span className="value">{user.email}</span>
            </div>
          </div>
          <div className="profile-info-item">
            <FaCar />
            <div>
              <span className="label">Qo'shilgan mashinalar</span>
              <span className="value">{user.carsAdded || 0}</span>
            </div>
          </div>
          <div className="profile-info-item">
            <FaCalendarAlt />
            <div>
              <span className="label">Ro'yxatdan o'tgan</span>
              <span className="value">{new Date(user.createdAt).toLocaleDateString("uz-UZ")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;