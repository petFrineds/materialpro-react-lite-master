import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import axios from "axios";
import React, { useState, useEffect } from "react";

const PayhistoryTable = () => {

  const baseUrl = "http://localhost:8082";

  const [pays, setPays] = useState([]);
  const userId = "soya95";

  useEffect(() => {
    getPayList();
   }, []);
  
   async function getPayList() {
    await axios
      .get(baseUrl + "/payments/" + userId)
      .then((response) => {
        console.log(response.data);
        setPays(response.data);
      })
     .catch((error)=>{
        console.error(error)
     })
  }

  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">[결제내역]</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless>
            <thead>
              <tr>
                <th>예약번호</th>
                <th>결제일자</th>
                <th>결제수단</th>
                <th>결제금액</th>
              </tr>
            </thead>
            <tbody>
              {pays.map((pay, index) => (
                <tr key={index} className="border-top">
                  <td>{pay.reservedId}</td>
                  <td>{pay.payDate}</td>
                  <td>Card</td>
                  <td><div id="amt">{pay.amount.toLocaleString('ko-KR')}</div></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default PayhistoryTable;