// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ForumPage from "./pages/ForumPage/ForumPgae";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import About from "./components/About/About";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";


function App() {
  return (
    <div>   
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forum"  element={<ForumPage/>} />
        <Route path="/dashboard"  element={<DashboardPage/>} />
        <Route path="/about"  element={<About/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
