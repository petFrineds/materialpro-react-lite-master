import { Table } from 'reactstrap';

const ReservationInfoComponent = ({ reservationInfo }) => {
  return (
    <div>
      <Table hover className="no-wrap mt-3 align-middle" responsive borderless>
        <thead>
          예약 정보
          <tr>
            <th>예약 날짜</th>
            <th>시작 시간</th>
            <th>종료 시간</th>
            <th>최종 금액</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-top">
            <td>{reservationInfo.startTime?.substring(0, 11)}</td>
            <td>{reservationInfo.startTime?.substring(11, 18)}</td>
            <td>{reservationInfo.endTime?.substring(11, 18)}</td>
            <td>{reservationInfo.amount}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ReservationInfoComponent;
