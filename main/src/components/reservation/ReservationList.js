import { Card, CardBody, CardTitle, Table } from 'reactstrap';

import user1 from '../../assets/images/users/user1.jpg';

const ReservationList = ({ reservationList }) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">예약 전체 조회</CardTitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>이름</th>
                <th>스케줄</th>
                <th>금액</th>
                <th>상태</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {reservationList?.map((item, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={item.avatar ?? user1}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{item.dogwalkerId}</h6>
                        <span className="text-muted">{item.dogwalkerName}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    {item.startTime} ~ {item.endTime}
                  </td>
                  <td>{item.amount}</td>
                  <td>{item.status}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ReservationList;
