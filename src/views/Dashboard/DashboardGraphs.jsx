import React from 'react';
import ReactApexChart from 'react-apexcharts';
import Graphcard from '../../shared/Cards/GraphCard';

export default function DashboardGraphs() {
  const chartData = {
    series: [44, 55, 13, 43, 22, 44, 55],
    options: {
      colors: [' #0A5F59', '#FDCF6F'],
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };
  const MemberStatus = {
    series: [44, 55, 41],

    options: {
      colors: ['#3A7DFF', '#1E617A', '#FF6361'],
      chart: {
        type: 'donut',
      },

      labels: ['New Joins', 'Cancels', 'Expires'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    },
  };
  const NewRegistration = {
    series: [
      {
        data: [40, 85, 68, 57, 80, 65, 21, 40, 85, 68, 57, 80, 65, 65, 45],
      },
    ],
    options: {
      colors: ['#252B42'],
      chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function (chart, w, e) {
            // console.log(chart, w, e)
          },
        },
      },
      // colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        },
      },
      dataLabels: {
        formatter: (chartData) => {
          return chartData / 100 + '%';
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [
          ['jan'],
          [''],
          ['March'],
          [''],
          ['May'],
          [''],
          ['July'],
          [''],
          ['Sep'],
          [''],
          ['Nov'],
          [''],
          ['Jan'],
          [''],
          ['March'],
        ],
        labels: {
          style: {
            // colors: colors,
            fontSize: '12px',
          },
        },
      },
    },
  };
  const RevenueActiveMembers = {
    series: [
      {
        name: 'Active Member',
        type: 'column',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 100],
      },
      {
        name: 'Revenue',
        type: 'line',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
      },
    ],
    options: {
      colors: ['#FDCF6F', '#252B42'],
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
      },
      stroke: {
        width: [0, 2, 5],
        curve: 'smooth',
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
        },
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: 'vertical',
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      labels: [
        '01/01/2023',
        '02/01/2023',
        '03/01/2023',
        '04/01/2023',
        '05/01/2023',
        '06/01/2023',
        '07/01/2023',
        '08/01/2023',
        '09/01/2023',
        '10/01/2023',
        '11/01/2023',
      ],
      markers: {
        size: 0,
      },
      xaxis: {
        type: 'datetime',
      },
      yaxis: {
        text: '',
        min: 0,
      },
      title: {
        text: '',
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== 'undefined') {
              return y.toFixed(0) + ' points';
            }
            return y;
          },
        },
      },
    },
  };
  return (
    <div className="grid my-2">
      <Graphcard title="% Active Members Checked-In">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="pie"
          height={350}
        />
      </Graphcard>
      <Graphcard title="Members Status by Month">
        <ReactApexChart
          options={MemberStatus.options}
          series={MemberStatus.series}
          type="donut"
          height={350}
        />
      </Graphcard>
      <Graphcard title="Revenue & Active Members Trend">
        <ReactApexChart
          options={RevenueActiveMembers.options}
          series={RevenueActiveMembers.series}
          type="line"
          height={350}
        />
      </Graphcard>
      <Graphcard title="New Registration by Month">
        <ReactApexChart
          options={NewRegistration.options}
          series={NewRegistration.series}
          type="bar"
          height={350}
        />
      </Graphcard>
    </div>
  );
}
