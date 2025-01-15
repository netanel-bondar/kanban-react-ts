import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainApp: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Navbar />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainApp;
