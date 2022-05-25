import React from "react"
import GetEvent from "../../components/GetEvent/GetEvent"
import GooglePlaces from "../../components/GooglePlaces/GooglePlaces"

const DashboardPage = (props) => {
    return(
        <div>
            <div>
              <GetEvent/>  
            </div>
            <div>
                <GooglePlaces/>
            </div>
        </div>
       
        
    )
}







export default DashboardPage;

// import {useLoadScript} from "@react-google-maps/api";


// export default function DashboardPage(){

    
//   const {isLoaded} = useLoadScript({
//     googleMapsAPIKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//     libraries: ["places"],

//   })

//   if (!isLoaded) return <div>Loading....</div>
//   return <Map/> <Event/>
// }