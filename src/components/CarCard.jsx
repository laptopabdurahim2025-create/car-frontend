import React from "react";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaPalette,
  FaCalendarAlt,
  FaRoad,
  FaEye,
} from "react-icons/fa";

const CarCard = ({ car, onDelete }) => {
  const handleDelete = () => {
    const isConfirmed = window.confirm(
      `"${car.carName}" mashinasini o'chirishni xohlaysizmi?`
    );
    if (isConfirmed) {
      onDelete(car._id);
    }
  };

  return (
    <div className="car-card">
      <div className="car-card-image">
        <img
          src={car.imageUrl}
          alt={car.carName}
          onError={(e) => {
            e.target.src =
              "https://placehold.co/400x250?text=Rasm+mavjud+emas";
          }}
        />
        <span className="view-badge">
          <FaEye /> {car.viewCount}
        </span>
      </div>

      <div className="car-card-body">
        <h3 className="car-card-title">
          <Link to={`/cars/${car._id}`}>{car.carName}</Link>
        </h3>

        <div className="car-card-info">
          <div className="info-item">
            <FaPalette className="info-icon" />
            <span className="info-label">Rangi:</span>
            <span className="info-value">{car.color}</span>
          </div>
          <div className="info-item">
            <FaCalendarAlt className="info-icon" />
            <span className="info-label">Yili:</span>
            <span className="info-value">{car.manufacturingYear}</span>
          </div>
          <div className="info-item">
            <FaRoad className="info-icon" />
            <span className="info-label">Masofa:</span>
            <span className="info-value">{car.mileage}</span>
          </div>
          <div className="info-item">
            <FaEye className="info-icon" />
            <span className="info-label">Ko'rishlar:</span>
            <span className="info-value">{car.viewCount}</span>
          </div>
        </div>
      </div>

      <div className="car-card-actions">
        <Link to={`/edit/${car._id}`} className="btn btn-edit">
          <FaEdit />
          <span>Tahrirlash</span>
        </Link>
        <button onClick={handleDelete} className="btn btn-delete">
          <FaTrash />
          <span>O'chirish</span>
        </button>
      </div>
    </div>
  );
};

export default CarCard;