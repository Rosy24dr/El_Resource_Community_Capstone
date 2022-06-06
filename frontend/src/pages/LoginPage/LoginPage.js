import React, { useContext, useEffect, useState} from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import Hands3 from "./Hands3.jpg";
import People2 from "./People2.jpg"
import RedHeart from "./RedHeart.jpg"
import Hope from "./Hope.jpg"
import Rise from "./Rise.jpg"
import HeartHands from "./HeartHands.jpg"
import { Accordion, Carousel } from "react-bootstrap";
import Popup from "../../components/Popup/Popup";

const LoginPage = () => {

  return (
    <div id="loginBackground">
      <Carousel fade className="login_display">
        <Carousel.Item>
          <img className="d-block w-100" src={Hands3} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={HeartHands} alt="Third slide" />
        </Carousel.Item>
        
      </Carousel>
    </div>
  );
};

export default LoginPage;
