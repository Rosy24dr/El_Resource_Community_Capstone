import React from "react";
import { Container } from "react-bootstrap";
import Map from "../../components/Map/Map";
import "./MapPage.css"

const MapPage = (props) => {
  return (
    <div className="mapPageBackground"> 
      <Container style={{ width: "50%", height: "300px" }}>
        <Map />
      </Container>
    </div>
  );
};

export default MapPage;
