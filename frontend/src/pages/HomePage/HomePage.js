import React from "react";

import useAuth from "../../hooks/useAuth";
import "./HomePage.css";

import { Container, Row } from "react-bootstrap";

import GetEvent from "../../components/GetEvent/GetEvent";
import Map from "../../components/Map/Map";

const HomePage = () => {
  const [user, token] = useAuth();

  return (
    <body id="homePageBackground">
      <div>
        <div className="container">
          <div id="homePage">
            <h1 className="welcome">Welcome {user.username}!</h1>
            <Container
              style={{ width: "100%", height: "100%", paddingBottom: "80%" }}
            >
              <Row>
                <GetEvent />
              </Row>
              <Row
                style={{
                  width: "50%",
                  height: "300px",
                  display: "flex",
                  justifyContent: "center",
                  paddingLeft: "15%",
                  marginTop: "3%",
                }}
              >
                <Map />
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </body>
  );
};

export default HomePage;
