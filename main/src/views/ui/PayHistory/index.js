import PayhistoryTable from "../../../components/dogWalker/PayhistoryTable";
import { Row, Col } from "reactstrap";

const PayHistory = () => {
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

export default PayHistory;
