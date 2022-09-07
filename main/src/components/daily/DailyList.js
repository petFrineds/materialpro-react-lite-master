import { Button, Rate } from 'antd';
import { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Table } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import DailyStarScoreComponent from './DailyStarScoreComponent';
import DailyDetailComponent from './DailyDetailComponent';
import user1 from '../../assets/images/users/user1.jpg';
import { setDailyInfo } from '../../store/Daily';
import { getUserInfo } from '../../api/AuthApi';
import { setDogwalkerInfo } from '../../store/DogWalker';
const DailyList = () => {
  const dispatch = useDispatch();
  const dailyList = useSelector(state => state.daily.get('dailyList'));
  const dailyInfo = useSelector(state => state.daily.get('dailyInfo'));

  const [visibleDaily, setVisibleDaily] = useState(false);
  const [visibleDailyDetail, setVisibleDailyDetail] = useState(false);
  useEffect(() => {}, []);
  const onClickReviewDetail = item => {
    if (item.review === undefined || item.review === null || item.review === '')
      return;
    getUserInfo(item.dogWalkerId)
      .then(result => {
        dispatch(setDogwalkerInfo(result.data));
      })
      .catch(error => {
        console.log('getDogwalkscheuleDetail Error >> ' + error);
      });
    dispatch(setDailyInfo(item));
    setVisibleDailyDetail(true);
  };
  const onClickStartScoreBtn = (e, item) => {
    getUserInfo(item.dogWalkerId)
      .then(result => {
        dispatch(setDogwalkerInfo(result.data));
      })
      .catch(error => {
        console.log('getDogwalkscheuleDetail Error >> ' + error);
      });
    dispatch(setDailyInfo(item));
    setVisibleDaily(true);
    e.stopPropagation();
  };
  const setDailyInfoInit = () => {
    dispatch(setDailyInfo(undefined));
  };
  return (
    <div>
      <Card>
        {!visibleDaily && !visibleDailyDetail && (
          <CardBody>
            <CardTitle tag="h5">도그워커 일지 조회</CardTitle>

            <Table
              hover
              className="no-wrap mt-3 align-middle"
              responsive
              borderless
            >
              <thead>
                <tr>
                  <th>도그워커</th>
                  <th>산책시간</th>
                  <th>산책내용</th>
                  <th>별점</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {dailyList?.map((item, index) => (
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
                          <h6 className="mb-0">{item.dogWalkerId}</h6>
                          <span className="text-muted">
                            {item.dogWalkerName}
                          </span>
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
                    <td>
                      {(item.review === undefined || item.review === null) && (
                        <Button onClick={e => onClickStartScoreBtn(e, item)}>
                          별점 등록
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        )}
        {visibleDaily && dailyInfo && (
          <DailyStarScoreComponent setVisible={setVisibleDaily} />
        )}
        {visibleDailyDetail && (
          <DailyDetailComponent
            setVisible={setVisibleDailyDetail}
            dailyInfo={dailyInfo}
            dailyInfoInit={setDailyInfoInit}
          />
        )}
      </Card>
    </div>
  );
};

export default DailyList;
