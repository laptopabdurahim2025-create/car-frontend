import axios from "axios";

const API_URL = "https://abdurahim.maktab16.uz/api/v1";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// Token qo'shish
const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAllCars = async () => {
  const res = await api.get("/cars");
  return res.data;
};

export const getCarById = async (id) => {
  const res = await api.get(`/cars/${id}`);
  return res.data;
};

export const createCar = async (carData) => {
  const res = await api.post("/cars", carData, { headers: authHeader() });
  return res.data;
};

export const updateCar = async (id, carData) => {
  const res = await api.put(`/cars/${id}`, carData, { headers: authHeader() });
  return res.data;
};

export const deleteCar = async (id) => {
  const res = await api.delete(`/cars/${id}`, { headers: authHeader() });
  return res.data;
};
