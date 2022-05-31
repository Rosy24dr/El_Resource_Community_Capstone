import React from "react";
import { Container } from "react-bootstrap";
import Map from "../../components/Map/Map";

const MapPage = (props) => {
  return (
    <div>
      <Container style={{ width: "50%", height: "300px" }}>
        <Map />
      </Container>
    </div>
  );
};

export default MapPage;
