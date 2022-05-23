// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Comment from "./components/Comment/Comment";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Forum from "./components/Forum/Forum"

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";
import CommentForm from "./components/CommentForm/CommentForm";

function App() {
  return (
    <div>

      <Forum/>
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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
