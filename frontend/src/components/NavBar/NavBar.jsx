import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";
import Heart from "./Heart.png";
import { bubble as Menu } from "react-burger-menu";
import useCustomForm from "../../hooks/useCustomForm";
import Popup from "../../components/Popup/Popup";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const [buttonPopup, setButtonPopup] = useState(false);
  const navigate = useNavigate();

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
    <div className="navBar">
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <img
              src={Heart}
              alt="heart with a hand in the center"
              className="image"
            />
            <h1 className="title">El Resource Community</h1>
          </Link>
        </li>

        <Menu>
          <li>
            {user ? (
              <button onClick={logoutUser} className="navbarButton">
                Logout
              </button>
            ) : (
              <button
                onClick={() => setButtonPopup(true)}
                className="navbarButton"
              >
                Login
              </button>
            )}
          </li>
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
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
              {isServerError ? (
                <p className="error">Login failed, incorrect credentials!</p>
              ) : null}

              <button className="navbarButton">Login!</button>
              <Link to="/register">Click to register!</Link>
            </form>
          </Popup>
          {/* <a className="menu-item" href="/login">
            HOME
          </a> */}
          <a className="menu-item" href="/">
            DASHBOARD
          </a>
          <a className="menu-item" href="/forum">
            FORUM
          </a><a className="menu-item" href="/map">
            MAP
          </a>
          <a className="menu-item" href="/about">
            ABOUT US
          </a>
          
        </Menu>
      </ul>
    </div>
  );
};

{
  /* <button onClick={() => setButtonPopup(true)} className="postForm-btn">Add Post</button> */
}

export default Navbar;
