const NewRegistration = {
  series: [
    {
      data: [40, 85, 68, 57, 80, 65, 21, 40, 85, 68, 57, 80, 65, 65, 45],
    },
  ],
  options: {
    colors: ["#252B42"],
    chart: {
      height: 350,
      type: "bar",
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        },
      },
    },
    // colors: colors,
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    dataLabels: {
      formatter: (chartData) => {
        return chartData / 100 + "%";
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
        ["jan"],
        [""],
        ["March"],
        [""],
        ["May"],
        [""],
        ["July"],
        [""],
        ["Sep"],
        [""],
        ["Nov"],
        [""],
        ["Jan"],
        [""],
        ["March"],
      ],
      labels: {
        style: {
          // colors: colors,
          fontSize: "12px",
        },
      },
    },
  },
};
export default NewRegistration;
