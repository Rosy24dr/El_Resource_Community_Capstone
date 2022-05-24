import React from "react"
import Map from "../../components/Map/Map"
import {useLoadScript} from "@react-google-maps/api";


export default function DashboardPage(){
  const {isLoaded} = useLoadScript({
    googleMapsAPIKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],

  })

  if (!isLoaded) return <div>Loading....</div>
  return <Map/>
}