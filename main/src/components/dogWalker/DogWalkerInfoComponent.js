import { Button } from 'antd';
import { Table } from 'reactstrap';

import user1 from '../../assets/images/users/user1.jpg';
import ExitButton from '../common/ExitButton';
const DogWalkerInfoComponent = ({
  dogWalkerInfo,
  setDogwalkerDetail,
  dogwalkerDetail,
}) => {
  const onClickClose = () => {
    setDogwalkerDetail(!dogwalkerDetail);
  };

  return (
    <div>
      <Table hover className="no-wrap mt-3 align-middle" responsive borderless>
        <thead>
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
                  src={
                    dogWalkerInfo?.userImage
                      ? `data:image/jpeg;base64,${dogWalkerInfo.userImage}`
                      : user1
                  }
                  className="rounded-circle"
                  alt="avatar"
                  width="45"
                  height="45"
                />
                <div className="ms-3">
                  <h6 className="mb-0">{dogWalkerInfo.userId}</h6>
                  <span className="text-muted">{dogWalkerInfo.userNm}</span>
                </div>
              </div>
            </td>
            <td>{dogWalkerInfo.career}</td>
            <td>
              {dogWalkerInfo.avgScore && dogWalkerInfo.avgScore.toFixed(1)}
            </td>
            <td>{dogWalkerInfo.walkCount}</td>
          </tr>
        </tbody>
      </Table>
      {dogwalkerDetail && <ExitButton onClick={onClickClose} />}
    </div>
  );
};

export default DogWalkerInfoComponent;
