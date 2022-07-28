import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import { Button } from "antd";
import {
  registData,
  deleteData,
  getData,
  putData,
} from "../../api/DogWalkerApi";
import { useSelector, useDispatch } from "react-redux";
import { setDogWalkerList } from "../../store/DogWalker";
import user1 from "../../assets/images/users/user1.jpg";
import user2 from "../../assets/images/users/user2.jpg";
import user3 from "../../assets/images/users/user3.jpg";
import user4 from "../../assets/images/users/user4.jpg";
import user5 from "../../assets/images/users/user5.jpg";
const sampleData = [
  {
    avatar: user1,
    id: "1",
    name: "euni",
    email: "euni@sk.com",
    reservedYn: "N",
    avgScore: 4.5,
    career: 3,
    price: "5,000",
  },
  {
    avatar: user2,
    id: "2",
    name: "euni2",
    email: "euni2@sk.com",
    reservedYn: "N",
    avgScore: 4.0,
    career: 2,
    price: "4,000",
  },
  {
    avatar: user3,
    id: "3",
    name: "euni3",
    email: "euni3@sk.com",
    reservedYn: "Y",
    avgScore: 5.0,
    career: 7,
    price: "7,000",
  },
];
const DogWalkerList = () => {
  const dispatch = useDispatch();
  const dogWalkerList = useSelector((state) =>
    state.dogWalker.get("dogWalkerList")
  );

  const clicked = () => {
    let result = registData({
      id: "1",
    });

    dispatch(setDogWalkerList(sampleData));
  };
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">도그 워커 조회</CardTitle>
          <Button onClick={clicked}>클릭 </Button>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>도그워커</th>
                <th>평점</th>

                <th>Status</th>
                <th>경력</th>
                <th>가격</th>
              </tr>
            </thead>
            <tbody>
              {dogWalkerList?.map((item, index) => (
                <tr key={index} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={item.avatar}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{item.name}</h6>
                        <span className="text-muted">{item.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{item.avgScore}</td>
                  <td>
                    {item.reservedYn === "Y" ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : item.reservedYn === "N" ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td>{item.career}</td>
                  <td>{item.price}</td>
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
