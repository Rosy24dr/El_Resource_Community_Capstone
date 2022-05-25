import React from "react"
import GetEvent from "../../components/GetEvent/GetEvent"
import Map from "../../components/Map/Map"

const DashboardPage = (props) => {
    return(
        <div>
            <div>
              <GetEvent/>  
            </div>
            <div>
                <Map/>
            </div>
        </div>
       
        
    )
}

export default DashboardPage;

