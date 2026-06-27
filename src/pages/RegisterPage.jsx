import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserPlus,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { loginUser: setAuth } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      toast.error("Barcha maydonlarni to'ldiring");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Parollar mos kelmadi");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Parol kamida 6 belgi bo'lishi kerak");
      return;
    }
    try {
      setLoading(true);
      const res = await registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      setAuth(res.data, res.token);
      toast.success(res.message);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <FaUserPlus className="auth-icon" />
          <h1>Ro'yxatdan o'tish</h1>
          <p>Yangi hisob yarating</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
          </div>
          <div className="auth-input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="auth-input-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Parol"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="auth-input-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Parolni tasdiqlang"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary auth-btn"
            disabled={loading}
          >
            {loading ? "Yaratilmoqda..." : "Ro'yxatdan o'tish"}
          </button>
        </form>
        <p className="auth-footer">
          Hisobingiz bormi? <Link to="/login">Tizimga kiring</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
