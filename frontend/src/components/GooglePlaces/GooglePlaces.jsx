import {useLoadScript} from "@react-google-maps/api";
import Map from "../Map/Map.tsx"
import { KEY } from "../../LocalKey"


export default function GoogleMaps(){
    const { isLoaded} = useLoadScript({
        googleMapsApiKey: KEY, 
        libraries: ["places",]
    })

    if (!isLoaded) return <div>Loading...</div>
    return <Map/>;
}