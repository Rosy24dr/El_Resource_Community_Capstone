import "./About.css"
import { Link } from "react-router-dom";

const About = () => {
    return ( 
        <body className="about" id="about">
        <div > 
        <Link to="/">
              <button>Back to Home</button>
            </Link>
          <h1>ABOUT US</h1>
          <div>
            <p>TEST</p>
          </div>

        </div>
        </body>
     );
}
 
export default About;