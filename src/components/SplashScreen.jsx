import React from "react";

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="splash-car-icon">🚗</div>
        <h1 className="splash-title">Car CRUD</h1>
        <p className="splash-subtitle">Mashinalar boshqaruv tizimi</p>
        <div className="splash-loader">
          <div className="splash-dot"></div>
          <div className="splash-dot"></div>
          <div className="splash-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;