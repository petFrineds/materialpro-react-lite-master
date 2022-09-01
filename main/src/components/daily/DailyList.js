import { Button } from 'antd';
import { useEffect } from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';

import user1 from '../../assets/images/users/user1.jpg';

const DailyList = ({ dailyList }) => {
  useEffect(() => {}, []);
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">일지 조회</CardTitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>도그워커</th>
                <th>산책장소</th>
                <th>산책시간</th>
                <th>산책내용</th>
                <th>별점</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {dailyList?.map((item, index) => (
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
                        <span className="text-muted">{item.userNm}</span>
                      </div>
                    </div>
                  </td>
                  <td>{item.walkingPlace}</td>
                  <td>
                    {item.walkStartDate} ~ {item.walkEndDate}
                  </td>
                  <td>{item.contents}</td>
                  <td>{item.starScore}</td>
                  <td>
                    {(item.starScore === undefined ||
                      item.starScore === null) && <Button>별점 등록</Button>}
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

export default DailyList;
