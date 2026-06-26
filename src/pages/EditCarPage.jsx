import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { getCarById, updateCar } from "../services/carService";
import CarForm from "../components/CarForm";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

const EditCarPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
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

  const handleSubmit = async (carData) => {
    try {
      setSubmitting(true);
      await updateCar(id, carData);
      toast.success("Mashina muvaffaqiyatli yangilandi! ✏️");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
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
    <div className="edit-car-page">
      <div className="page-header">
        <h1><FaEdit /> Mashinani Tahrirlash</h1>
        <p>{car?.carName} ma'lumotlarini yangilash</p>
      </div>
      <CarForm
        initialData={car}
        onSubmit={handleSubmit}
        isEditing={true}
        loading={submitting}
      />
    </div>
  );
};

export default EditCarPage;