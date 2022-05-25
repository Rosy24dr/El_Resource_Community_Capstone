import React from "react";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
    Combobox,
    ComboboxInput,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";
  
  
  type PlacesProps = {
   setAddress: (position: google.maps.LatLngLiteral) => void;
  };
  
  export default function Places({setAddress}: PlacesProps) {
    const {
      ready,
      value,
      setValue,
      suggestions: { status, data },
      clearSuggestions,
    } = usePlacesAutocomplete();
  
    return 
  // <Combobox onSelect={() => {}}>
  //     <ComboboxInput value={value} onChange={e => setValue(e.target.value)} disabled={!ready} className="combox-input"/>
  //   </Combobox>
  }