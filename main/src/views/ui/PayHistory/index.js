import PayhistoryTable from '../../../components/payment/PayhistoryTable';
import { Row, Col, Button } from 'reactstrap';
import React, { useState, useEffect } from 'react';
import { getAllPaymentHistory } from '../../../api/PaymentApi';
import { useSelector, useDispatch } from 'react-redux';
import { setPaymentList } from '../../../store/Payment';
import PaymentModal from '../../../components/payment/PaymentModal';
const PayHistory = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
  const paymentList = useSelector(state => state.payment.get('paymentList'));
  const userInfo = useSelector(state => state.user.get('userInfo'));

  useEffect(() => {
    console.log(userInfo);
    getAllPaymentHistory(sessionStorage.getItem('userId'))
      .then(result => {
        dispatch(setPaymentList(result.data));
      })
      .catch(error => {
        console.log('getAllPaymentHistory Error >> ' + error);
        dispatch(setPaymentList([]));
      });

    dispatch(setPaymentList(paymentList));
  }, []);
  const clicked = () => {
    setVisible(true);
  };
  return (
    <Row>
      <Col lg="12">
        {paymentList && <PayhistoryTable paymentList={paymentList} />}
      </Col>
    </Row>
  );
};

export default PayHistory;
