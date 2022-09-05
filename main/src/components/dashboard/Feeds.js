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

const FeedData = [
  {
    title: 'Cras justo odio',
    icon: 'bi bi-bell',
    color: 'primary',
    date: '6 minute ago',
  },
  {
    title: 'New user registered.',
    icon: 'bi bi-person',
    color: 'info',
    date: '6 minute ago',
  },
  {
    title: 'Server #1 overloaded.',
    icon: 'bi bi-hdd',
    color: 'danger',
    date: '6 minute ago',
  },
];

const Feeds = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">산책 랭킹</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          최근 7일간 최다 산책자 순위
        </CardSubtitle>
        <ListGroup flush className="mt-4">
          {FeedData.map((feed, index) => (
            <ListGroupItem
              key={index}
              action
              href="/"
              tag="a"
              className="d-flex align-items-center p-3 border-0"
            >
              <Button
                className="rounded-circle me-3"
                size="sm"
                color={feed.color}
              >
                <i className={feed.icon}></i>
              </Button>
              {feed.title}
              <small className="ms-auto text-muted text-small">
                {feed.date}
              </small>
            </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Feeds;
