import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoicm9zeTI0ZHIiLCJhIjoiY2wzbjNtbDI1MDljNjNlcGV5aW10Mmk4cyJ9.SPmx8TQ1IjGNA0Q5XK0vqw";

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
  setupMap([-2.24, 53.48]);
}

function setupMap(center) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 15,
  });

  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav);

  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
  });

  map.addControl(directions, "top-left");
}

// import React, { Component } from "react";
// import { KEY } from "../../LocalKey";
// import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";

// export class Mapcontainer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       address: "",
//       showingInfoWindow: false,
//       activeMarker: {},
//       selectedPlace: {},

//       mapCenter: {
//         lat: 39.4143,
//         lng: -77.4105,
//       },
//       Style: {
//         maxWidth: "450px",
//         height: "350px",
//         overflowX: "hidden",
//         overflowY: "hidden",
//       },
//     };
//   }

//   onMarkerClick = (props, marker, e) =>
//     this.setState({
//       selectedPlace: props,
//       activeMarker: marker,
//       showingInfoWindow: true,
//     });

//   onMapClicked = (props) => {
//     if (this.state.showingInfoWindow) {
//       this.setState({
//         showingInfoWindow: false,
//         activeMarker: null,
//       });
//     }
//   };

//   handleChange = (address) => {
//     this.setState({ address });
//   };

//   handleSelect = (address) => {
//     geocodeByAddress(address)
//       .then((results) => getLatLng(results[0]))
//       .then((latLng) => {
//         console.log("Success", latLng);
//         this.setState({ address });
//         this.setState({ mapCenter: latLng });
//       })
//       .catch((error) => console.error("Error", error));
//   };

//   render() {
//     return (
//       <div>
//         <PlacesAutocomplete
//           value={this.state.address}
//           onChange={this.handleChange}
//           onSelect={this.handleSelect}
//         >
//           {({
//             getInputProps,
//             suggestions,
//             getSuggestionItemProps,
//             loading,
//           }) => (
//             <div>
//               <input
//                 {...getInputProps({
//                   placeholder: "Search Places ...",
//                   className: "location-search-input",
//                 })}
//               />
//               <div className="autocomplete-dropdown-container">
//                 {loading && <div>Loading...</div>}
//                 {suggestions.map((suggestion) => {
//                   const className = suggestion.active
//                     ? "suggestion-item--active"
//                     : "suggestion-item";

//                   const style = suggestion.active
//                     ? { backgroundColor: "#fafafa", cursor: "pointer" }
//                     : { backgroundColor: "#ffffff", cursor: "pointer" };
//                   return (
//                     <div
//                       {...getSuggestionItemProps(suggestion, {
//                         className,
//                         style,
//                       })}
//                     >
//                       <span>{suggestion.description}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </PlacesAutocomplete>

//         <Map
//           google={this.props.google}
//           onClick={this.onMapClicked}
//           style={this.state.Style}
//           initialCenter={{
//             lat: this.state.mapCenter.lat,
//             lng: this.state.mapCenter.lng,
//           }}
//           center={{
//             lat: this.state.mapCenter.lat,
//             lng: this.state.mapCenter.lng,
//           }}
//         >
//           <Marker
//             position={{
//               lat: this.state.mapCenter.lat,
//               lng: this.state.mapCenter.lng,
//             }}
//             onClick={this.onMarkerClick}
//             name={"Current location"}
//             draggable={true}

//           />
//         </Map>
//       </div>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: KEY,
// })(Mapcontainer);
