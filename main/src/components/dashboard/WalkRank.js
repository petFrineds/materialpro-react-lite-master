import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from 'reactstrap';
import WalkRankUser from '../myPage/WalkRankUser';

const WalkRank = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">산책 랭킹</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          최근 7일간 최다 산책자 순위
        </CardSubtitle>
        <WalkRankUser />
      </CardBody>
    </Card>
  );
};

export default WalkRank;
