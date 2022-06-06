import { Row, Container } from "react-bootstrap";
import Forum from "../../components/Forum/Forum";
import "./ForumPage.css";

const ForumPage = () => {
  return (
    <div className="forumPageBackground">
     
        <Container style={{ width: "60%", height: "30%", marginBottom: "100%"}}>
          <Row tyle={{ width: "60%", height: "30%", marginBottom: "100%"}}>
            <Forum />
          </Row>
        </Container>
    </div>
  );
};

export default ForumPage;
