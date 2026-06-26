import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaCar } from "react-icons/fa";
import { getAllCars, deleteCar } from "../services/carService";
import CarCard from "../components/CarCard";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllCars();
      setCars(response.data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCar(id);
      setCars((prevCars) => prevCars.filter((car) => car._id !== id));
      toast.success("Mashina muvaffaqiyatli o'chirildi! 🗑️");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="error-container">
        <h2>❌ Xatolik yuz berdi</h2>
        <p>{error}</p>
        <button onClick={fetchCars} className="btn btn-primary">
          Qayta urinish
        </button>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="page-header">
        <div className="header-content">
          <h1><FaCar /> Mashinalar Ro'yxati</h1>
          <p>Jami: {cars.length} ta mashina</p>
        </div>
        <Link to="/add" className="btn btn-primary">
          <FaPlus /> Yangi Mashina
        </Link>
      </div>

      {cars.length === 0 ? (
        <div className="empty-state">
          <FaCar size={64} />
          <h2>Hozircha mashinalar yo'q</h2>
          <p>Birinchi mashinani qo'shish uchun quyidagi tugmani bosing</p>
          <Link to="/add" className="btn btn-primary">
            <FaPlus /> Mashina Qo'shish
          </Link>
        </div>
      ) : (
        <div className="cars-grid">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;