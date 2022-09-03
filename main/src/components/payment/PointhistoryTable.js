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
import moment from 'moment';
const PointhistoryTable = ({ pointList }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(pointList);
  }, []);
  const onCancleButtonClick = reservedId => {
    refundPayment(reservedId)
      .then(result => {
        notification.success({
          message: '환불 완료',
          description: '환불이 성공적으로 완료 되었습니다.',
          duration: 1.0,
        });
        const newData = pointList.filter(
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
          <CardTitle tag="h5">[포인트 이용 내역]</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6"></CardSubtitle>

          <Table
            hover
            className="no-wrap mt-3 align-middle"
            responsive
            borderless
          >
            <thead>
              <tr>
                <th>예약번호</th>

                <th>결제일자</th>
                <th>포인트 구분</th>
                <th>포인트 사용 내역</th>
                <th>현재 포인트</th>
              </tr>
            </thead>
            <tbody>
              {pointList?.map((item, index) => (
                <tr key={index} className="border-top">
                  <td>{item.reservedId}</td>
                  <td>{moment(item.createDate).format('YYYY-MM-DD HH:mm')}</td>
                  <td>{item.pointGubun}</td>
                  <td>
                    <div id="amt">{item.point}</div>
                  </td>
                  <td>{item.currentPoint}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default PointhistoryTable;
