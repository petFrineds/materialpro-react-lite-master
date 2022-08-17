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
    /* aws 에러가 해결 되면 이 주석 풀고 밑에 paymentTempList 넣는 코드 지워주세요
    getAllPaymentHistory(userInfo.userId)
      .then(result => {
        dispatch(setPaymentList(result.data));
      })
      .catch(error => {
        console.log('getAllPaymentHistory Error >> ' + error);
        dispatch(setPaymentList([]));
      });
    */
    const paymentTempList = [
      {
        reservedId: '202206231125321',
        payDate: '2020-06-18 18:00',
        paymentMethod: 'Card',
        amount: '20000',
      },
      {
        reservedId: '202206231125322',
        payDate: '2020-06-20 18:00',
        paymentMethod: 'Point',
        amount: '10000',
      },
      {
        reservedId: '202206231125323',
        payDate: '2020-06-22 18:00',
        paymentMethod: 'Point',
        amount: '25000',
      },
    ];
    dispatch(setPaymentList(paymentTempList));
  }, []);
  const clicked = () => {
    setVisible(true);
  };
  return (
    <Row>
      <Button onClick={clicked}>결제하기</Button>
      {visible && <PaymentModal setVisible={setVisible} visible={visible} />}
      <Col lg="12">
        <PayhistoryTable paymentList={paymentList} />
      </Col>
    </Row>
  );
};

export default PayHistory;
