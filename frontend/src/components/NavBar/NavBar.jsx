import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";
import Heart from "./Heart.png";
import Popup from "../../components/Popup/Popup";
import useCustomForm from "../../hooks/useCustomForm";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Sidebar } from "./Sidebar";
import {  bubble as Menu } from "react-burger-menu";
// import { } from "react-bootstrap";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [buttonPopup, setButtonPopup] = useState(false);

  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);


  return (
    <body className="navBar">
      <div>
        <ul>
          <li className="brand">
            <div>
              <Link to="/">
                <img
                  src={Heart}
                  alt="heart with a hand in the center"
                  className="image"
                />
                <h1 className="title">El Resource Community</h1>
              </Link>
            </div>
          </li>

          <Menu>
            <a className="menu-item" href="/login">HOME</a>
            <a className="menu-item" href="/forum">
              FORUM
            </a>
            <a className="menu-item" href="/">DASHBOARD</a>
            <a className="menu-item" href="/about">ABOUT US</a>
          </Menu>

          <main>
            {user ? (
              <button onClick={logoutUser}>Logout</button>
            ) : (
              <button onClick={() => setButtonPopup(true)}>Login</button>
            )}
            {isServerError ? (
              <p className="error">Login failed, incorrect credentials!</p>
            ) : null}
          </main>
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <li>
              <form className="form" onSubmit={handleSubmit}>
                <label>
                  Username:{" "}
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Password:{" "}
                  <input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </label>

                <Link to="/register">Click to register!</Link>
                <button>Login!</button>
              </form>
            </li>
          </Popup>
        </ul>
      </div>
    </body>
  );
};

export default Navbar;
