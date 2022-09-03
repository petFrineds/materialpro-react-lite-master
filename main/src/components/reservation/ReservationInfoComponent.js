import { Table } from 'reactstrap';

const ReservationInfoComponent = ({ reservationinfo }) => {
  return (
    <div>
      <Table className="no-wrap mt-3 align-middle" responsive borderless>
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
            <td>{reservationinfo.startTime?.substring(0, 11)}</td>
            <td>{reservationinfo.startTime?.substring(11, 18)}</td>
            <td>{reservationinfo.endTime?.substring(11, 18)}</td>
            <td>{reservationinfo.amount}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ReservationInfoComponent;
