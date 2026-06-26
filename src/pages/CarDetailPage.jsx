import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaArrowLeft, FaEdit, FaTrash,
  FaPalette, FaCalendarAlt, FaRoad, FaEye, FaClock,
} from "react-icons/fa";
import { getCarById, deleteCar } from "../services/carService";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCar();
    // eslint-disable-next-line
  }, [id]);

  const fetchCar = async () => {
    try {
      setLoading(true);
      const response = await getCarById(id);
      setCar(response.data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      `"${car.carName}" mashinasini o'chirishni xohlaysizmi?`
    );
    if (isConfirmed) {
      try {
        await deleteCar(id);
        toast.success("Mashina muvaffaqiyatli o'chirildi! 🗑️");
        navigate("/");
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="error-container">
        <h2>❌ Xatolik yuz berdi</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/")} className="btn btn-primary">
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  return (
    <div className="car-detail-page">
      <button onClick={() => navigate("/")} className="btn btn-back">
        <FaArrowLeft /> Orqaga
      </button>

      <div className="car-detail-container">
        <div className="car-detail-image">
          <img
            src={car.imageUrl}
            alt={car.carName}
            onError={(e) => {
              e.target.src = "https://placehold.co/600x400?text=Rasm+mavjud+emas";
            }}
          />
        </div>

        <div className="car-detail-info">
          <h1>{car.carName}</h1>

          <div className="detail-grid">
            <div className="detail-item">
              <FaPalette className="detail-icon" />
              <div>
                <span className="detail-label">Rangi</span>
                <span className="detail-value">{car.color}</span>
              </div>
            </div>
            <div className="detail-item">
              <FaCalendarAlt className="detail-icon" />
              <div>
                <span className="detail-label">Ishlab chiqarilgan yili</span>
                <span className="detail-value">{car.manufacturingYear}</span>
              </div>
            </div>
            <div className="detail-item">
              <FaRoad className="detail-icon" />
              <div>
                <span className="detail-label">Yurgan masofasi</span>
                <span className="detail-value">{car.mileage}</span>
              </div>
            </div>
            <div className="detail-item">
              <FaEye className="detail-icon" />
              <div>
                <span className="detail-label">Ko'rishlar soni</span>
                <span className="detail-value">{car.viewCount}</span>
              </div>
            </div>
            <div className="detail-item">
              <FaClock className="detail-icon" />
              <div>
                <span className="detail-label">Qo'shilgan sana</span>
                <span className="detail-value">
                  {new Date(car.createdAt).toLocaleDateString("uz-UZ")}
                </span>
              </div>
            </div>
            <div className="detail-item">
              <FaClock className="detail-icon" />
              <div>
                <span className="detail-label">Yangilangan sana</span>
                <span className="detail-value">
                  {new Date(car.updatedAt).toLocaleDateString("uz-UZ")}
                </span>
              </div>
            </div>
          </div>

          <div className="detail-actions">
            <Link to={`/edit/${car._id}`} className="btn btn-edit">
              <FaEdit /> Tahrirlash
            </Link>
            <button onClick={handleDelete} className="btn btn-delete">
              <FaTrash /> O'chirish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;