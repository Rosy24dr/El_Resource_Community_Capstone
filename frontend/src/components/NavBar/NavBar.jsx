import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";
import Heart from "./Heart.png";
import Popup from "../../components/Popup/Popup";
import useCustomForm from "../../hooks/useCustomForm";
import { bubble as Menu } from "react-burger-menu";

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
              <Link to="/login">
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
            <a className="menu-item" href="/login">
              HOME
            </a>
            <a className="menu-item" href="/forum">
              FORUM
            </a>
            <a className="menu-item" href="/">
              DASHBOARD
            </a>
            <a className="menu-item" href="/about">
              ABOUT US
            </a>
            <a className="menu-item" href="/map">
              MAP
            </a>
          </Menu>

          <main>
            {user ? (
              <button className="navbarLogOutButton" onClick={logoutUser}>
                Logout
              </button>
            ) : (
              <button
                className="navbarLoginButton"
                onClick={() => setButtonPopup(true)}
              >
                Login
              </button>
            )}
            {isServerError ? (
              <p className="error">Login failed, incorrect credentials!</p>
            ) : null}{" "}
            <Link className="navbarRegisterButton" to="/register">
              Register!
            </Link>
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

                <button
                  onClick={() => setButtonPopup(true)}
                  className="loginPopUpButton"
                >
                  Login!
                </button>
              </form>
            </li>
          </Popup>
        </ul>
      </div>
    </body>
  );
};
export default Navbar;
