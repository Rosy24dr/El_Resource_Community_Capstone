import { Row, Container} from "react-bootstrap";
import Forum from "../../components/Forum/Forum";
import "./ForumPage.css"


const ForumPage =() => {
    return (
        <Container style={{ width: "60%", height: "30%", marginBottom:"30%"}}>
            <Row>
              <Forum/>  
            </Row>
        </Container>
        
    )
}

export default ForumPage;