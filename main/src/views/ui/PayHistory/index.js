import PayhistoryTable from '../../../components/payment/PayhistoryTable';
import { Row, Col, Button } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import { getAllPaymentHistory, getAllPoint } from '../../../api/PaymentApi';
import { useSelector, useDispatch } from 'react-redux';
import { setPaymentList, setPointList } from '../../../store/Payment';
import PaymentModal from '../../../components/payment/PaymentModal';
import PointhistoryTable from '../../../components/payment/PointhistoryTable';
const PayHistory = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const paymentList = useSelector(state => state.payment.get('paymentList'));
  const pointList = useSelector(state => state.payment.get('pointList'));
  const userInfo = useSelector(state => state.user.get('userInfo'));

  useEffect(() => {
    if (userInfo) {
      getAllPaymentHistory(userInfo.userId)
        .then(result => {
          dispatch(setPaymentList(result.data));
        })
        .catch(error => {
          console.log('getAllPaymentHistory Error >> ' + error);
          dispatch(setPaymentList([]));
        });
      getAllPoint(userInfo.userId)
        .then(result => {
          dispatch(setPointList(result.data));
        })
        .catch(error => {
          console.log('getAllPaymentHistory Error >> ' + error);
          dispatch(setPointList([]));
        });
    }
  }, []);
  const clicked = () => {
    setVisible(true);
  };
  return (
    <Row>
      <Col lg="12">
        {paymentList && <PayhistoryTable paymentList={paymentList} />}
      </Col>
      <Col lg="12">
        {pointList && <PointhistoryTable pointList={pointList} />}
      </Col>
    </Row>
  );
};

export default PayHistory;
