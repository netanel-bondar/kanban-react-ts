import LoginPage from "./components/LoginPage";
import SettingsPage from "./components/SettingsPage";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import BoardPage from "./components/BoardPage";
import MainApp from "./components/MainApp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { MenuProvider } from "./context/MenuContext";

function App() {
  return (
    <AuthProvider>
      <MenuProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />

            <Route path="/app/*" element={<MainApp />}>
              <Route path="home" element={<HomePage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="board/:boardId" element={<BoardPage />} />
            </Route>
          </Routes>
        </Router>
      </MenuProvider>
    </AuthProvider>
  );
}

export default App;
