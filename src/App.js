import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AddCarPage from "./pages/AddCarPage";
import EditCarPage from "./pages/EditCarPage";
import CarDetailPage from "./pages/CarDetailPage";
import "./App.css";

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <Navbar />
      <main className="main-content">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/add" element={<AddCarPage />} />
            <Route path="/edit/:id" element={<EditCarPage />} />
            <Route path="/cars/:id" element={<CarDetailPage />} />
            <Route
              path="*"
              element={
                <div className="error-container">
                  <h1>404</h1>
                  <h2>Sahifa topilmadi</h2>
                  <p>Siz qidirayotgan sahifa mavjud emas</p>
                </div>
              }
            />
          </Routes>
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <p>© 2026 Car CRUD — MERN Stack Loyiha</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;