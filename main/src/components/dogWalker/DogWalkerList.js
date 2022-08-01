import { Card, CardBody, CardTitle, Table } from "reactstrap";

import user1 from "../../assets/images/users/user1.jpg";

const DogWalkerList = ({ dogWalkerList }) => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">도그 워커 조회</CardTitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>도그워커</th>
                <th>평점</th>
                <th>Status</th>
                <th>경력(년)</th>
                <th>가격(₩)</th>
                <th>산책 가능 시간</th>
              </tr>
            </thead>
            <tbody>
              {dogWalkerList?.map((item, index) => (
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
                        <h6 className="mb-0">{item.userName}</h6>
                        <span className="text-muted">{item.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{item.avgScore}</td>
                  <td>
                    {item.reservedYn === "Y" ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td>{item.career}</td>
                  <td>{item.price}</td>
                  <td>
                    {item.reservedStartTime} ~ {item.reservedEndTime}
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

export default DogWalkerList;
