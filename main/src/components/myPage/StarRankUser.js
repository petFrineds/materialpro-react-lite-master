import { Button, notification } from 'antd';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';

import user1 from '../../assets/images/users/user1.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { getStarRankUser, getUserInfo } from '../../api/AuthApi';
import DogWalkerInfoComponent from '../dogWalker/DogWalkerInfoComponent';
const StarRankUser = () => {
  const [starRankUser, setStarRankUser] = useState('');
  const [dogwalkerDetail, setDogwalkerDetail] = useState(false);
  const [dogWalkerInfo, setDogWalkerInfo] = useState(null);

  useEffect(() => {
    getStarRankUser()
      .then(result => {
        console.log(result);
        setStarRankUser(result.data);
      })
      .catch(error => {
        console.log('getStarRankUser Error >> ' + error);
      });
  }, []);
  const onClickDetail = dogwalkerId => {
    getUserInfo(dogwalkerId)
      .then(result => {
        console.log(result.data);
        setDogWalkerInfo(result.data);
        setDogwalkerDetail(true);
      })
      .catch(error => {
        console.log('ReservationDetail getUserInfo Error >> ' + error);
        setDogwalkerDetail(false);
      });
  };
  return (
    <div>
      {!dogwalkerDetail && (
        <Table
          hover
          className="no-wrap mt-3 align-middle"
          responsive
          borderless
        >
          <thead>
            <tr>
              <th>순위</th>
              <th>유저</th>
              <th>평점</th>
              <th>경력</th>
            </tr>
          </thead>
          <tbody>
            {starRankUser &&
              starRankUser?.map((item, index) => (
                <tr
                  key={index}
                  className="border-top"
                  onClick={() => onClickDetail(item.userId)}
                >
                  <td>{index + 1}</td>
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
                        <h6 className="mb-0">{item.userId}</h6>
                        <span className="text-muted">{item.userNm}</span>
                      </div>
                    </div>
                  </td>
                  <td>{item.avgScore}</td>
                  <td>{item.career}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
      {dogwalkerDetail && dogWalkerInfo !== null && (
        <DogWalkerInfoComponent
          dogWalkerInfo={dogWalkerInfo}
          setDogwalkerDetail={setDogwalkerDetail}
          dogwalkerDetail={dogwalkerDetail}
        />
      )}
    </div>
  );
};

export default StarRankUser;
