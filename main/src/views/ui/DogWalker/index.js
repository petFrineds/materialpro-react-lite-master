import DogWalkerList from "../../../components/dogWalker/DogWalkerList";
import { Row, Col } from "reactstrap";

const DogWalker = () => {
  return (
    <Row>
      <Col lg="12">
        <DogWalkerList />
      </Col>
    </Row>
  );
};

export default DogWalker;
