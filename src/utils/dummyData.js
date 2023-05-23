const dummyData = () => {
  const relationshipColumns = [
    { field: "code", header: "Code" },
    { field: "name", header: "Name" },
    { field: "category", header: "Category" },
    { field: "quantity", header: "Quantity" },
  ];

  const relationshipData = [
    {
      code: 123,
      name: "Amrit",
      category: "qwe",
      quantity: "123",
    },
    {
      code: 123,
      name: "Amrit",
      category: "qwe",
      quantity: "123",
    },
    {
      code: 123,
      name: "Amrit",
      category: "qwe",
      quantity: "123",
    },
    {
      code: 123,
      name: "Amrit",
      category: "qwe",
      quantity: "123",
    },
    {
      code: 123,
      name: "Amrit",
      category: "qwe",
      quantity: "123",
    },
  ];
  const reasonCode = [
    { field: "name", header: "Name(4)" },
    { field: "abcCode", header: "ABC Code" },
    { field: "", header: "", body: "tableActionTemplate" },
  ];
  const reasonCodeData = [
    {
      name: "Agreement in queue",
      abcCode: "IN_QUEUE",
    },
    {
      name: "Agreement removed from queue",
      abcCode: "AGR_REMOVED",
    },
    {
      name: "Cancelled by user",
      abcCode: "USER_CANCELLED",
    },
  ];
  const manageEmployee = [
    { field: "name", header: "Name(4)" },
    { field: "deparment", header: "Deparment" },
    { field: "barcod", header: "Barcode" },
    { field: "address", header: "Address" },
    { field: "primary", header: "Primary" },
    { field: "hireDates", header: "Hire Dates" },
    { field: "terminates", header: "Terminates" },
    { field: "", header: "", body: "tableActionTemplate" },
  ];
  const manageEmolyeeData = [
    {
      name: "Agreement in queue",
      deparment: "Trainers",
      barcod: "akddjcns",
      address: "New Jersey",
      primary: "(551)206-4043",
      hireDates: "March-12-2023",
      terminates: "",
    },
    {
      name: "Agreement in queue",
      deparment: "Trainers",
      barcod: "akddjcns",
      address: "New Jersey",
      primary: "(551)206-4043",
      hireDates: "March-12-2023",
      terminates: "",
    },
    {
      name: "Agreement in queue",
      deparment: "Trainers",
      barcod: "akddjcns",
      address: "New Jersey",
      primary: "(551)206-4043",
      hireDates: "March-12-2023",
      terminates: "",
    },
    {
      name: "Agreement in queue",
      deparment: "Trainers",
      barcod: "akddjcns",
      address: "New Jersey",
      primary: "(551)206-4043",
      hireDates: "March-12-2023",
      terminates: "",
    },
    {
      name: "Agreement in queue",
      deparment: "Trainers",
      barcod: "akddjcns",
      address: "New Jersey",
      primary: "(551)206-4043",
      hireDates: "March-12-2023",
      terminates: "",
    },
  ];

  return {
    relationshipColumns,
    relationshipData,
    reasonCode,
    reasonCodeData,
    manageEmolyeeData,
    manageEmployee,
  };
};

export default dummyData;
