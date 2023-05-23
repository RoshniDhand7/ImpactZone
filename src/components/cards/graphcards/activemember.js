const chartData = {
  series: [44, 55, 13, 43, 22, 44, 55],
  options: {
    colors: [" #0A5F59", "#FDCF6F"],
    chart: {
      width: 380,
      type: "pie",
    },
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  },
};
export default chartData;
