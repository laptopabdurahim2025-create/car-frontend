import axios from "axios";

const API_URL = "https://abdurahim.maktab16.uz/api/v1";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const getProfile = async (token) => {
  const res = await api.get("/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Admin funksiyalari
export const getDashboard = async (token) => {
  const res = await api.get("/admin/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getAllUsers = async (token) => {
  const res = await api.get("/admin/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const banUser = async (id, reason, token) => {
  const res = await api.put(
    `/admin/users/${id}/ban`,
    { banReason: reason },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const unbanUser = async (id, token) => {
  const res = await api.put(
    `/admin/users/${id}/unban`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const makeAdmin = async (id, token) => {
  const res = await api.put(
    `/admin/users/${id}/make-admin`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const removeAdmin = async (id, token) => {
  const res = await api.put(
    `/admin/users/${id}/remove-admin`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const deleteUserAdmin = async (id, token) => {
  const res = await api.delete(`/admin/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};