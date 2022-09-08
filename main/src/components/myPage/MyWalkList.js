import { Button, notification } from 'antd';
import { useEffect } from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';

import user1 from '../../assets/images/users/user1.jpg';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { endWalk } from '../../api/WalkApi';
import { setMyWalkList } from '../../store/Walk';
const MyWalkList = () => {
  const dispatch = useDispatch();
  const myWalkList = useSelector(state => state.walk.get('myWalkList'));

  const onClickEndWalk = item => {
    const param = {
      reservedId: item.reservedId,
      userId: item.userId,
      dogWalkerId: item.dogwalkerId,
    };

    endWalk(param)
      .then(result => {
        notification.success({
          message: '산책 종료',
          description: '산책이 성공적으로 종료 되었습니다.',
          duration: 1.0,
        });
        const newRow = myWalkList.filter(
          item2 => item2.reservedId !== item.reservedId
        );
        dispatch(setMyWalkList(newRow));
      })
      .catch(error => {
        notification.error({
          message: '산책 종료',
          description: '산책 종료가 실패 되었습니다.',
          duration: 1.0,
        });
        console.log('startWalk Error >> ' + error);
      });
  };
  return (
    <div>
      <Table hover className="no-wrap mt-3 align-middle" responsive borderless>
        <thead>
          <tr>
            <th>유저</th>
            <th>Status</th>
            <th>산책 시작 시간</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {myWalkList?.map((item, index) => (
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
                    <h6 className="mb-0">{item.userId}</h6>
                    <span className="text-muted">{item.userId}</span>
                  </div>
                </div>
              </td>
              <td>{item.smsStatus}</td>

              <td>
                {item.walkStartDate &&
                  moment(item.walkStartDate).format('YYYY-MM-DD HH:mm')}
              </td>
              <td>
                {item.smsStatus === 'START' && (
                  <Button onClick={() => onClickEndWalk(item)}>
                    산책 종료
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MyWalkList;
