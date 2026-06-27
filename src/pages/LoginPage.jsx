import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginUser: setAuth } = useAuth();
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.login || !formData.password) {
      toast.error("Barcha maydonlarni to'ldiring");
      return;
    }
    try {
      setLoading(true);
      const res = await loginUser(formData);
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
          <FaSignInAlt className="auth-icon" />
          <h1>Tizimga kirish</h1>
          <p>Hisobingizga kiring</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-input-group">
            <FaUser className="input-icon" />
            <input type="text" name="login" value={formData.login} onChange={handleChange} placeholder="Username yoki Email" />
          </div>
          <div className="auth-input-group">
            <FaLock className="input-icon" />
            <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Parol" />
            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? "Kirish..." : "Kirish"}
          </button>
        </form>
        <p className="auth-footer">
          Hisobingiz yo'qmi? <Link to="/register">Ro'yxatdan o'ting</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;