import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import Hands from "./Hands.jpg"
import Popup from "../../components/Popup/Popup"

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );
  const [buttonPopup, setButtonPopup] = useState(false);

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  return (
    <div className="container">
      <main>
        <button onClick={() => setButtonPopup(true)}>Login</button>
      </main>
      <img src={Hands} id="hands"/>
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
        <Link to="/register">Click to register!</Link>
        <button>Login!</button>
      </form>
      </Popup>
    </div>
  );
};

export default LoginPage;
