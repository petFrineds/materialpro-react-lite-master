import { Card, CardBody, CardSubtitle, CardTitle } from 'reactstrap';
import Chart from 'react-apexcharts';
import MyWalkList from '../myPage/MyWalkList';
const SalesChart = () => {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ['transparent'],
    },
    legend: {
      show: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        borderRadius: 2,
      },
    },
    colors: ['#0d6efd', '#009efb', '#6771dc'],
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '60%',
              borderRadius: 7,
            },
          },
        },
      },
    ],
  };
  const series = [
    {
      name: '2020',
      data: [20, 40, 50, 30, 40, 50, 30, 30, 40],
    },
    {
      name: '2022',
      data: [10, 20, 40, 60, 20, 40, 60, 60, 20],
    },
  ];

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">현재 산책 현황</CardTitle>
        <CardSubtitle className="text-muted" tag="h6">
          나의 산책 현황
        </CardSubtitle>
        <MyWalkList />
      </CardBody>
    </Card>
  );
};

export default SalesChart;
