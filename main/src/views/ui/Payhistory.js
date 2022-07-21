import PayhistoryTable from "../../components/dashboard/PayhistoryTable";
import { Row, Col } from "reactstrap";

const Tables = () => {
  return (
    <Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* table-1*/}
      {/* --------------------------------------------------------------------------------*/}
      <Col lg="12">
        <PayhistoryTable />
      </Col>
    </Row>
  );
};

export default Tables;
