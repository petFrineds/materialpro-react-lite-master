import { Button, Rate } from 'antd';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import DailyStarScoreComponent from './DailyStarScoreComponent';
import DailyDetailComponent from './DailyDetailComponent';
import user1 from '../../assets/images/users/user1.jpg';
import { setMyDailyInfo } from '../../store/Daily';
import { getUserInfo } from '../../api/AuthApi';
import { setDogwalkerInfo } from '../../store/DogWalker';

const MyDailyList = () => {
  const dispatch = useDispatch();
  const myDailyList = useSelector(state => state.daily.get('myDailyList'));
  const myDailyInfo = useSelector(state => state.daily.get('myDailyInfo'));
  const [visibleDaily, setVisibleDaily] = useState(false);
  const [visibleDailyDetail, setVisibleDailyDetail] = useState(false);
  useEffect(() => {}, []);
  const onClickReviewDetail = item => {
    getUserInfo(item.dogWalkerId)
      .then(result => {
        dispatch(setDogwalkerInfo(result.data));
      })
      .catch(error => {
        console.log('getDogwalkscheuleDetail Error >> ' + error);
      });
    dispatch(setMyDailyInfo(item));
    setVisibleDailyDetail(true);
  };
  const setMyDailyInfoInit = () => {
    dispatch(setMyDailyInfo(undefined));
  };
  return (
    <div>
      <Card>
        {!visibleDaily && !visibleDailyDetail && (
          <CardBody>
            <CardTitle tag="h5">일지 조회</CardTitle>

            <Table
              hover
              className="no-wrap mt-3 align-middle"
              responsive
              borderless
            >
              <thead>
                <tr>
                  <th>유저</th>
                  <th>산책시간</th>
                  <th>산책내용</th>
                  <th>별점</th>
                </tr>
              </thead>
              <tbody>
                {myDailyList?.map((item, index) => (
                  <tr
                    key={index}
                    className="border-top"
                    onClick={() => onClickReviewDetail(item)}
                  >
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
                          <span className="text-muted">{item.userName}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      {item.walkStartDate} ~ {item.walkEndDate}
                    </td>
                    <td>{item.contents.substring(0, 10) + '...'}</td>
                    <td>
                      <Rate
                        disabled
                        defaultValue={item.starScore}
                        value={item.starScore}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        )}
        {visibleDailyDetail && (
          <DailyDetailComponent
            setVisible={setVisibleDailyDetail}
            dailyInfo={myDailyInfo}
            dailyInfoInit={setMyDailyInfoInit}
          />
        )}
      </Card>
    </div>
  );
};

export default MyDailyList;
