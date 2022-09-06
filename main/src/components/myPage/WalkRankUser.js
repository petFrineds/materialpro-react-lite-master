import { Button, notification } from 'antd';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';

import user1 from '../../assets/images/users/user1.jpg';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { endWalk } from '../../api/WalkApi';
import { setMyWalkList } from '../../store/Walk';
import { getWalkRankUser } from '../../api/AuthApi';
const WalkRankUser = () => {
  const [walkRankUser, setWalkRankUser] = useState('');
  useEffect(() => {
    getWalkRankUser()
      .then(result => {
        console.log(result);
        setWalkRankUser(result.data);
      })
      .catch(error => {
        console.log('startWalk Error >> ' + error);
      });
  }, []);
  const dispatch = useDispatch();

  return (
    <div>
      <Table hover className="no-wrap mt-3 align-middle" responsive borderless>
        <thead>
          <tr>
            <th>순위</th>
            <th>유저</th>
            <th>산책 횟수</th>
            <th>경력</th>
          </tr>
        </thead>
        <tbody>
          {walkRankUser &&
            walkRankUser?.map((item, index) => (
              <tr key={index} className="border-top">
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
                      <span className="text-muted">{item.userId}</span>
                    </div>
                  </div>
                </td>
                <td>{item.walkCount}</td>
                <td>{item.career}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default WalkRankUser;
