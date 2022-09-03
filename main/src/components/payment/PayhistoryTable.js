import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
} from 'reactstrap';
import { notification } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPaymentList } from '../../store/Payment';

import { refundPayment } from '../../api/PaymentApi';

const PayhistoryTable = ({ paymentList }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(paymentList);
  }, []);
  const onCancleButtonClick = reservedId => {
    refundPayment(reservedId)
      .then(result => {
        notification.success({
          message: '환불 완료',
          description: '환불이 성공적으로 완료 되었습니다.',
          duration: 1.0,
        });
        const newData = paymentList.filter(
          item => item.reservedId !== reservedId
        );
        dispatch(setPaymentList(newData));
      })
      .catch(result => {
        notification.error({
          message: '환불 실패',
          description: '환불이 실패 되었습니다. >>> ' + result,
          duration: 1.0,
        });
      })
      .finally(function () {});
  };
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">[결제내역]</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6"></CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>예약번호</th>
                <th>결제일자</th>
                <th>결제수단</th>
                <th>결제금액</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {paymentList?.map((item, index) => (
                <tr key={index} className="border-top">
                  <td>{item.reservedId}</td>
                  <td>{item.payDate}</td>
                  <td>{item.payType}</td>
                  <td>
                    <div id="amt">{item.amount}</div>
                  </td>
                  <td>{item.refundYn === 'N' ? <> </> : <>환불 완료</>}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default PayhistoryTable;
