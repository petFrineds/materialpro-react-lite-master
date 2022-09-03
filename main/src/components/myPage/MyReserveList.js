import { Button } from 'antd';
import { useEffect } from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';

import user1 from '../../assets/images/users/user1.jpg';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

const MyReserveList = () => {
  const myReserveList = useSelector(state => state.mypage.get('myReserveList'));
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">내 예약 조회</CardTitle>

          <Table
            hover
            className="no-wrap mt-3 align-middle"
            responsive
            borderless
          >
            <thead>
              <tr>
                <th>도그워커</th>
                <th>Status</th>
                <th>가격(₩)</th>
                <th>산책 요청 시간</th>
                <th>산책 시간</th>
              </tr>
            </thead>
            <tbody>
              {myReserveList?.map((item, index) => (
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
                  <td>{item.status}</td>
                  <td>{item.amount}</td>
                  <td>
                    {item.startTime &&
                      moment(item.startTime).format('YYYY-MM-DD HH:mm') +
                        ' ~ ' +
                        moment(item.endTime).format('YYYY-MM-DD HH:mm')}
                  </td>
                  <td>
                    {item.walkStartDate &&
                      moment(item.walkStartDate).format('YYYY-MM-DD HH:mm') +
                        ' ~ ' +
                        moment(item.walkEndDate).format('YYYY-MM-DD HH:mm')}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default MyReserveList;
