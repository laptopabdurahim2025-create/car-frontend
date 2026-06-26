import React, { useState, useEffect } from "react";
import {
  FaCar,
  FaPalette,
  FaCalendarAlt,
  FaRoad,
  FaImage,
  FaEye,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CarForm = ({ initialData, onSubmit, isEditing, loading }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    carName: "",
    color: "",
    manufacturingYear: "",
    mileage: "",
    imageUrl: "",
    viewCount: 0,
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        carName: initialData.carName || "",
        color: initialData.color || "",
        manufacturingYear: initialData.manufacturingYear || "",
        mileage: initialData.mileage || "",
        imageUrl: initialData.imageUrl || "",
        viewCount: initialData.viewCount || 0,
      });
      setImagePreview(initialData.imageUrl || "");
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (name === "imageUrl") {
      setImagePreview(value);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.carName.trim()) newErrors.carName = "Mashina nomi kiritilishi shart";
    if (!formData.color.trim()) newErrors.color = "Rang kiritilishi shart";
    if (!formData.manufacturingYear) {
      newErrors.manufacturingYear = "Ishlab chiqarilgan yil kiritilishi shart";
    } else if (
      formData.manufacturingYear < 1886 ||
      formData.manufacturingYear > new Date().getFullYear() + 1
    ) {
      newErrors.manufacturingYear = "Yilni to'g'ri kiriting";
    }
    if (!formData.mileage.trim()) newErrors.mileage = "Yurgan masofa kiritilishi shart";
    if (!formData.imageUrl.trim()) newErrors.imageUrl = "Rasm URL manzili kiritilishi shart";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const dataToSend = {
      ...formData,
      manufacturingYear: Number(formData.manufacturingYear),
      viewCount: Number(formData.viewCount),
    };
    onSubmit(dataToSend);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="car-form">
        {/* Rasm preview */}
        <div className="image-preview-container">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Mashina rasmi"
              className="image-preview"
              onError={(e) => {
                e.target.src = "https://placehold.co/400x250?text=Rasm+yuklanmadi";
              }}
            />
          ) : (
            <div className="image-placeholder">
              <FaImage size={48} />
              <p>Rasm URL manzilini kiriting</p>
            </div>
          )}
        </div>

        {/* Forma maydonlari */}
        <div className="form-grid">
          {/* Mashina nomi */}
          <div className="form-group">
            <label htmlFor="carName">
              <FaCar className="form-icon" /> Mashina nomi
            </label>
            <input
              type="text"
              id="carName"
              name="carName"
              value={formData.carName}
              onChange={handleChange}
              placeholder="Masalan: Toyota Camry"
              className={errors.carName ? "error" : ""}
            />
            {errors.carName && <span className="error-text">{errors.carName}</span>}
          </div>

          {/* Rang */}
          <div className="form-group">
            <label htmlFor="color">
              <FaPalette className="form-icon" /> Rangi
            </label>
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Masalan: Qora"
              className={errors.color ? "error" : ""}
            />
            {errors.color && <span className="error-text">{errors.color}</span>}
          </div>

          {/* Yil */}
          <div className="form-group">
            <label htmlFor="manufacturingYear">
              <FaCalendarAlt className="form-icon" /> Ishlab chiqarilgan yili
            </label>
            <input
              type="number"
              id="manufacturingYear"
              name="manufacturingYear"
              value={formData.manufacturingYear}
              onChange={handleChange}
              placeholder="Masalan: 2023"
              min="1886"
              max={new Date().getFullYear() + 1}
              className={errors.manufacturingYear ? "error" : ""}
            />
            {errors.manufacturingYear && (
              <span className="error-text">{errors.manufacturingYear}</span>
            )}
          </div>

          {/* Masofa */}
          <div className="form-group">
            <label htmlFor="mileage">
              <FaRoad className="form-icon" /> Yurgan masofasi
            </label>
            <input
              type="text"
              id="mileage"
              name="mileage"
              value={formData.mileage}
              onChange={handleChange}
              placeholder="Masalan: 25,000 km"
              className={errors.mileage ? "error" : ""}
            />
            {errors.mileage && <span className="error-text">{errors.mileage}</span>}
          </div>

          {/* Rasm URL */}
          <div className="form-group full-width">
            <label htmlFor="imageUrl">
              <FaImage className="form-icon" /> Rasm URL manzili
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/car-image.jpg"
              className={errors.imageUrl ? "error" : ""}
            />
            {errors.imageUrl && <span className="error-text">{errors.imageUrl}</span>}
          </div>

          {/* Ko'rishlar soni */}
          {isEditing && (
            <div className="form-group">
              <label htmlFor="viewCount">
                <FaEye className="form-icon" /> Ko'rishlar soni
              </label>
              <input
                type="number"
                id="viewCount"
                name="viewCount"
                value={formData.viewCount}
                onChange={handleChange}
                min="0"
              />
            </div>
          )}
        </div>

        {/* Tugmalar */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            <FaSave />
            {loading ? "Saqlanmoqda..." : isEditing ? "Yangilash" : "Qo'shish"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            <FaTimes /> Bekor qilish
          </button>
        </div>
      </form>
    </div>
  );
};

export default CarForm;