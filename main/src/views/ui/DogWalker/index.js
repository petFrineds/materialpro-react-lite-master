import DogWalkerList from "../../../components/dogWalker/DogWalkerList";
import DogWalkerRegistModal from "../../../components/dogWalker/DogWalkerRegistModal";
import React, { useState, useEffect } from "react";
import "../../../assets/css/dogWalker/dogWalker.css";
import { Button, Col } from "antd";
import { getAllData } from "../../../api/DogWalkerApi";
import { useSelector, useDispatch } from "react-redux";
import { setDogWalkerList } from "../../../store/DogWalker";
const DogWalker = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const dogWalkerList = useSelector((state) =>
    state.dogWalker.get("dogWalkerList")
  );
  useEffect(() => {
    getAllData()
      .then((result) => {
        console.log(result);
        dispatch(setDogWalkerList(result.data));
      })
      .catch((error) => {
        console.log("getAllData Error >> " + error);
        dispatch(setDogWalkerList([]));
      });
  }, []);
  const clicked = () => {
    setVisible(true);
  };

  return (
    <>
      <Button onClick={clicked}>등록하기</Button>
      {visible && (
        <DogWalkerRegistModal setVisible={setVisible} visible={visible} />
      )}

      <Col lg="12">
        <DogWalkerList dogWalkerList={dogWalkerList} />
      </Col>
    </>
  );
};

export default DogWalker;
