const MemberStatus = {
  series: [44, 55, 41],

  options: {
    colors: ["#3A7DFF", "#1E617A", "#FF6361"],
    chart: {
      type: "donut",
    },

    labels: ["New Joins", "Cancels", "Expires"],
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

export default MemberStatus;
