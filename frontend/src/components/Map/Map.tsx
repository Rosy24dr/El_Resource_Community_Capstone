import { useState, useMemo, useCallback, useRef } from "react";
import "./Map.css"
import Places from "../Places/Places.tsx"
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";


type LatLngLiteral = google.maps.LatLngLiteral;


export default function Map() {
  const [address, setAddress] = useState<LatLngLiteral>();
  const mapref = useRef<GoogleMap>();
  const center =  useMemo<LatLngLiteral>(() => ({ lat: 39, lng: -77}), []);

  return (
    <div className="container">
      <div className="contorls">
        <h1>Hello</h1>
        <Places 
          setAddress={(position) => {
          setAddress(position);
          mapref.current?.panTo(position);
          }}
          />
      </div>
      <div className="map">
        <GoogleMap zoom={8} center={center} mapContainerClassName="map-container"></GoogleMap>
      </div>
    </div>

  ) 
};
