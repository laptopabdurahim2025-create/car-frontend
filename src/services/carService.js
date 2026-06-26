import axios from "axios";

const API_URL = "https://abdurahim.maktab16.uz/api/v1";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const getAllCars = async () => {
  try {
    const response = await api.get("/cars");
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getCarById = async (id) => {
  try {
    const response = await api.get(`/cars/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const createCar = async (carData) => {
  try {
    const response = await api.post("/cars", carData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const updateCar = async (id, carData) => {
  try {
    const response = await api.put(`/cars/${id}`, carData);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteCar = async (id) => {
  try {
    const response = await api.delete(`/cars/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

const handleError = (error) => {
  if (error.response) {
    return new Error(
      error.response.data.message || "Serverda xatolik yuz berdi",
    );
  } else if (error.request) {
    return new Error(
      "Server bilan aloqa yo'q. Backend ishga tushirilganligini tekshiring.",
    );
  } else {
    return new Error(error.message);
  }
};
