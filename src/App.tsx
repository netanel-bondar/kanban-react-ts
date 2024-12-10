import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import SettingsPage from "./components/SettingsPage";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
