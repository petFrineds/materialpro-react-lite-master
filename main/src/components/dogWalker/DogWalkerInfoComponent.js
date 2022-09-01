import { Table } from 'reactstrap';

import user1 from '../../assets/images/users/user1.jpg';
const DogWalkerInfoComponent = ({ dogWalkerInfo }) => {
  return (
    <div>
      <Table className="no-wrap mt-3 align-middle" responsive borderless>
        <thead>
          도그워커 정보
          <tr>
            <th>이름</th>
            <th>경력</th>
            <th>평점</th>
            <th>산책 횟수</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-top">
            <td>
              <div className="d-flex align-items-center p-2">
                <img
                  src={dogWalkerInfo.avatar ?? user1}
                  className="rounded-circle"
                  alt="avatar"
                  width="45"
                  height="45"
                />
                <div className="ms-3">
                  <h6 className="mb-0">{dogWalkerInfo.dogwalkerId}</h6>
                  <span className="text-muted">
                    {dogWalkerInfo.dogwalkerName}
                  </span>
                </div>
              </div>
            </td>
            <td>{dogWalkerInfo.career}</td>
            <td>{dogWalkerInfo.avgScore}</td>
            <td>{dogWalkerInfo.walkCount}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default DogWalkerInfoComponent;
