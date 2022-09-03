import {
  Button,
  Modal,
  Form,
  Radio,
  Space,
  Typography,
  Input,
  Row,
  Col,
  notification,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { requestPayment } from '../../api/PaymentApi';
import { useSelector, useDispatch } from 'react-redux';
import { setUserInfo } from '../../store/User';
import moment from 'moment';

const { Title } = Typography;

const PaymentModal = ({ setVisible, visible }) => {
  const [loading, setLoading] = useState(false);
  const paymentMethod = ['POINT', 'CARD'];
  const cardDetail = ['하나카드', '신한카드', '현대카드', '삼성카드'];
  const [paymentMethodValue, setPaymentMethodValue] = useState('POINT');
  const [cardDetailValue, setCardDetailValue] = useState('하나카드');
  const [cardNum1, setCardNum1] = useState('');
  const [cardNum2, setCardNum2] = useState('');
  const [cardNum3, setCardNum3] = useState('');
  const [cardNum4, setCardNum4] = useState('');
  const [cardMonth, setCardMonth] = useState('');
  const [cardYear, setCardYear] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.get('userInfo'));
  const reservationInfo = useSelector(state =>
    state.reservation.get('reservationInfo')
  );
  const [disabled, setDisabled] = useState(true);

  const handleCancel = () => {
    setVisible(false);
  };
  const onPaymentMethodChange = ({ target: { value } }) => {
    setPaymentMethodValue(value);
    if (value === 'POINT') setDisabled(true);
    else setDisabled(false);
  };
  const onCardDetailChange = ({ target: { value } }) => {
    console.log(value);
    setCardDetailValue(value);
  };
  const onChangeCardNum1 = e => {
    setCardNum1(e.target.value);
  };
  const onChangeCardNum2 = e => {
    setCardNum2(e.target.value);
  };
  const onChangeCardNum3 = e => {
    setCardNum3(e.target.value);
  };
  const onChangeCardNum4 = e => {
    setCardNum4(e.target.value);
  };
  const onChangeCardMonth = e => {
    setCardMonth(e.target.value);
  };
  const onChangeCardYear = e => {
    setCardYear(e.target.value);
  };
  const onChangeCardCVC = e => {
    setCardCVC(e.target.value);
  };
  const handleOk = () => {
    setLoading(true);
    const cardNo =
      disabled === false
        ? ''.concat(cardNum1, cardNum2, cardNum3, cardNum4)
        : '';
    if (
      !disabled &&
      (cardNo.length < 16 || cardNo.match(/^-{0,1}\d+$/) === null)
    ) {
      notification.warning({
        message: '카드 번호 확인',
        description: '카드 번호를 확인해주세요.',
        duration: 1.0,
      });
      setLoading(false);
      return;
    } else if (disabled && reservationInfo.amount > userInfo.pointAmount) {
      notification.warning({
        message: '포인트 확인',
        description: '포인트 잔액을 확인해주세요.',
        duration: 1.0,
      });
      setLoading(false);
      return;
    }
    const params = {
      userId: userInfo.userId,
      userName: userInfo.userNm,
      reservedId: reservationInfo.reservedId,
      amount: reservationInfo.amount,
      payGubun: 'PAY',
      cardNumber: cardNo,
      payDate: moment().format('YYYY-MM-DD HH:mm:ss.ssS'),
      cardValidMonth: cardMonth,
      cardValidYear: cardYear,
      cardCvc: cardCVC,
      cardCompany: cardDetailValue,
      payType: paymentMethodValue,
      currentPoint: userInfo.pointAmount,
      refundYn: 'N',
    };
    requestPayment(params)
      .then(result => {
        setVisible(false);
        notification.success({
          message: '결제 완료',
          description: '결제가 성공적으로 완료 되었습니다.',
          duration: 1.0,
        });
      })
      .catch(result => {
        console.log(result);
        notification.error({
          message: '결제 실패',
          description: '결제가 실패 되었습니다. >>> ' + result,
          duration: 1.0,
        });
      })
      .finally(function () {
        setLoading(false);
      });
  };

  return (
    <Modal
      visible={visible}
      title="결제하기"
      onOk={handleOk}
      centered
      style={{ top: 20 }}
      onCancel={handleCancel}
      footer={[
        <Button key="cancle" onClick={handleCancel}>
          취소
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          loading={loading}
          onClick={handleOk}
        >
          결제
        </Button>,
      ]}
    >
      <Title level={5}> 결제 금액 : {reservationInfo.amount}</Title>

      <Radio.Group onChange={onPaymentMethodChange} value={paymentMethodValue}>
        <Space direction="vertical">
          <Radio value="POINT">
            <Title level={5}>포인트 결제</Title>
            잔여 포인트 : {userInfo?.pointAmount}
          </Radio>
          <br />
          <Radio value="CARD">
            <Title level={5}> 카드결제</Title>
            <Space
              direction="vertical"
              size="middle"
              style={{ display: 'flex' }}
            >
              {!disabled && (
                <>
                  <Radio.Group
                    onChange={onCardDetailChange}
                    value={cardDetailValue}
                    optionType="button"
                    buttonStyle="solid"
                    disabled={disabled}
                  >
                    <Radio value="하나카드">하나카드</Radio>
                    <Radio value="신한카드">신한카드</Radio>
                    <Radio value="현대카드">현대카드</Radio>
                    <Radio value="삼성카드">삼성카드</Radio>
                  </Radio.Group>

                  <Space
                    direction="vertical"
                    size="small"
                    style={{ display: 'flex' }}
                  >
                    <Input.Group size="mid">
                      카드 번호
                      <Row gutter={8}>
                        <Col span={5}>
                          <Input
                            value={cardNum1}
                            onChange={onChangeCardNum1}
                            maxLength="4"
                          />
                        </Col>
                        <Col span={5}>
                          <Input
                            value={cardNum2}
                            onChange={onChangeCardNum2}
                            maxLength="4"
                          />
                        </Col>
                        <Col span={5}>
                          <Input
                            value={cardNum3}
                            onChange={onChangeCardNum3}
                            maxLength="4"
                          />
                        </Col>
                        <Col span={5}>
                          <Input
                            value={cardNum4}
                            onChange={onChangeCardNum4}
                            maxLength="4"
                          />
                        </Col>
                      </Row>
                    </Input.Group>
                  </Space>
                  <Space
                    direction="vertical"
                    size="small"
                    style={{ display: 'flex' }}
                  >
                    <Input.Group size="mid">
                      유효기간
                      <Row gutter={8}>
                        <Col span={5}>
                          <Input
                            value={cardMonth}
                            onChange={onChangeCardMonth}
                            maxLength="2"
                          />
                        </Col>
                        <Col span={2}> 월 /</Col>
                        <Col span={5}>
                          <Input
                            value={cardYear}
                            onChange={onChangeCardYear}
                            maxLength="4"
                          />
                        </Col>
                        <Col span={2}> 년</Col>
                        <Col span={3}> CVC</Col>

                        <Col span={5}>
                          <Input
                            value={cardCVC}
                            onChange={onChangeCardCVC}
                            maxLength="3"
                          />
                        </Col>
                      </Row>
                    </Input.Group>
                  </Space>
                </>
              )}
            </Space>
          </Radio>
        </Space>
      </Radio.Group>
    </Modal>
  );
};

export default PaymentModal;
