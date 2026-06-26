import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { createCar } from "../services/carService";
import CarForm from "../components/CarForm";
import { toast } from "react-toastify";

const AddCarPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (carData) => {
    try {
      setLoading(true);
      await createCar(carData);
      toast.success("Yangi mashina muvaffaqiyatli qo'shildi! 🚗");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-car-page">
      <div className="page-header">
        <h1><FaPlus /> Yangi Mashina Qo'shish</h1>
        <p>Barcha maydonlarni to'ldiring</p>
      </div>
      <CarForm onSubmit={handleSubmit} isEditing={false} loading={loading} />
    </div>
  );
};

export default AddCarPage;