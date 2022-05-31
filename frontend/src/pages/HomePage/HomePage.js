import React from "react";
// import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./HomePage.css"
// import Hands from "./Hands.jpg"

// import axios from "axios";
import { Container, Row} from "react-bootstrap";



import GetEvent from "../../components/GetEvent/GetEvent";
import Map from "../../components/Map/Map";


const HomePage = () => {
 const [user, token] = useAuth();
 


  return (

    <div>
    <div className="container">
    <div>
      <h1 className="welcome">Welcome {user.username}!</h1> 
      <Container>
        <Row>
          <GetEvent />
        </Row></Container>
        <Container style={{ width: "50%", height: "300px", display:"flex", justifyContent:"center", paddingRight:"3%",  }}>
          <Row><Map/>
        </Row>
        </Container>
        
        
      </div>
      <div>
       
      </div>

     
      

    </div>
    </div>
 
  );
};

export default HomePage;


//   // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
//   // The "token" value is the JWT token that you will send in the header of any request requiring authentication
//   //TODO: Add an AddCars Page to add a car for a logged in user's garage
//   const [user, token] = useAuth();
//   const [cars, setCars] = useState([]);

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         let response = await axios.get("http://127.0.0.1:8000/api/cars/", {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         });
//         setCars(response.data);
//       } catch (error) {
//         console.log(error.response.data);
//       }
//     };
//     fetchCars();
//   }, [token]);
//   return (
//     <div className="container">
//       <h1>Home Page for {user.username}!</h1>
//       {cars &&
//         cars.map((car) => (
//           <p key={car.id}>
//             {car.year} {car.model} {car.make}
//           </p>
//         ))}
//     </div>
//   );
// };