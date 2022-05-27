import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";
import Heart from "./Heart.png"

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <body className="navBar">
    <div>
      <ul>
        <li className="brand">
          <div>
          <Link to="/">
            <img src={Heart} alt="heart with a hand in the center" className="image"/>
          <h1 className="title">El Resource Community</h1>
          </Link></div>
        </li>
        <li>
          <Link  to="/forum">
               FORUM
          </Link>
          <Link  to="/dashboard">
               DASHBOARD
          </Link>
          <Link  to="/about">
               ABOUT US
          </Link>
        </li>
        <li>
          {user ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <button onClick={() => navigate("/login")}>Login</button>
          )}
        </li>
      </ul>
    </div>
    </body>
  );
};

export default Navbar;
