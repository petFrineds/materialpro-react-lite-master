import { Card, CardBody, CardTitle, Table } from 'reactstrap';
import { Button, notification, Modal } from 'antd';
import user1 from '../../assets/images/users/user1.jpg';
import { cancelReservation } from '../../api/ReservationApi';
import { useSelector, useDispatch } from 'react-redux';
import {
  setReservationList,
  setReservationDetailId,
  setReservationInfo,
} from '../../store/Reservation';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../../api/AuthApi';

import DogWalkerInfoComponent from '../dogWalker/DogWalkerInfoComponent';
import ReservationInfoComponent from './ReservationInfoComponent';
import PaymentModal from '../payment/PaymentModal';
import { refundPayment } from '../../api/PaymentApi';
import ExitButton from '../common/ExitButton';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

const ReservationDetailComponent = ({ dogWalkerInfo, onClickCancelBtn }) => {
  const [payModalVisible, setPayModalVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickPayBtn = () => {
    setPayModalVisible(true);
  };
  const onClickClose = () => {
    dispatch(setReservationInfo(undefined));
    navigate('/reservation');
  };
  const reservationInfo = useSelector(state =>
    state.reservation.get('reservationInfo')
  );
  const showConfirm = reservedId => {
    confirm({
      title: '결제를 취소하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      content: '결제 취소시 결제금액의 10%가 차감됩니다',
      onOk() {
        const param = {
          reservedId: reservedId,
          status: 'CANCEL',
        };
        cancelReservation(param)
          .then(result => {
            notification.success({
              message: '환불 완료',
              description: '환불이 성공적으로 완료 되었습니다.',
              duration: 1.0,
            });
            const newReservation = { ...reservationInfo, refundYn: 'Y' };
            console.log(newReservation);
            dispatch(setReservationInfo(newReservation));
          })
          .catch(result => {
            notification.error({
              message: '환불 실패',
              description: '환불이 실패 되었습니다. >>> ' + result,
              duration: 1.0,
            });
          })
          .finally(function () {});
      },
      onCancel() {},
    });
  };

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">예약 상세 조회</CardTitle>
          <DogWalkerInfoComponent dogWalkerInfo={dogWalkerInfo} />
          <ReservationInfoComponent reservationInfo={reservationInfo} />
          <ExitButton onClick={onClickClose} />

          {reservationInfo.status === 'REQUEST' ? (
            <>
              <Button
                onClick={e => onClickCancelBtn(reservationInfo.startTime)}
              >
                예약 취소
              </Button>
              &nbsp; &nbsp;
              <Button onClick={onClickPayBtn}>결제</Button>
            </>
          ) : reservationInfo.status === 'PAYED' &&
            reservationInfo.refundYn !== 'Y' ? (
            <Button onClick={() => showConfirm(reservationInfo.reservedId)}>
              결제 취소
            </Button>
          ) : (
            <> </>
          )}
        </CardBody>
      </Card>
      {payModalVisible && (
        <PaymentModal
          setVisible={setPayModalVisible}
          visible={payModalVisible}
        />
      )}
    </div>
  );
};

export default ReservationDetailComponent;
