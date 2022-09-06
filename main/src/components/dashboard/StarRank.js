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
import StarRankUser from '../myPage/StarRankUser';

const StarRank = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">별점 랭킹</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          최근 7일간 별점 순위
        </CardSubtitle>
        <StarRankUser />
      </CardBody>
    </Card>
  );
};

export default StarRank;
