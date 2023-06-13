const dummyData = () => {
  const relationshipColumns = [
    { field: "code", header: "Code" },
    { field: "name", header: "Name" },
    { field: "category", header: "Category" },
    { field: "quantity", header: "Quantity" },
  ];

  const commissionTableData = [
    {
      commissionGroup: ["Group 1", "Group 2"],
      commissionType: ["Type 1", "Type 2"],
      pay: null,
    },
    {
      commissionGroup: ["Group 1", "Group 2"],
      commissionType: ["Type 1", "Type 2"],
      pay: null,
    },
    {
      commissionGroup: ["Group 1", "Group 2"],
      commissionType: ["Type 1", "Type 2"],
      pay: null,
    },
    {
      commissionGroup: ["Group 1", "Group 2"],
      commissionType: ["Type 1", "Type 2"],
      pay: null,
    },
  ];

  const relationshipData = [
    {
      code: 123,
      name: "Jason Statham",
      category: "qwe",
      quantity: "123",
      id: 1,
    },
    {
      code: 123,
      name: "Jason Statham",
      category: "qwe",
      quantity: "123",
      id: 2,
    },
    {
      code: 123,
      name: "Jason Statham",
      category: "qwe",
      quantity: "123",
      id: 3,
    },
  ];
  const reasonCode = [
    { field: "name", header: "Name" },
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

  const actionTemplate = (col) => {
    return (
      <>
        <span>
          <i className="pi pi-pencil mr-3 "></i>
        </span>
        <span>
          <i className="pi pi-trash"></i>
        </span>
      </>
    );
  };

  const emailIconTemplate = (col) => {
    return col.sendEmail ? <i className="pi pi-envelope"></i> : null;
  };

  const manageEmployee = [
    { field: "", header: "", body: emailIconTemplate },
    { field: "name", header: "Name" },
    { field: "deparment", header: "Deparment" },
    { field: "barcod", header: "Barcode" },
    { field: "address", header: "Address" },
    { field: "primary", header: "Primary Phone" },
    { field: "hireDates", header: "Hire Date" },
    { field: "terminates", header: "Termination Date" },
    { field: "", header: "", body: actionTemplate },
  ];
  const manageEmolyeeData = [
    {
      name: "Agreement in queue",
      sendEmail: true,
      deparment: "Trainers",
      barcod: "akddjcns",
      address: "New Jersey",
      primary: "(551)206-4043",
      hireDates: "March-12-2023",
      terminates: "",
    },
    {
      name: "Agreement in queue",
      sendEmail: true,
      deparment: "Trainers",
      barcod: "akddjcns",
      address: "New Jersey",
      primary: "(551)206-4043",
      hireDates: "March-12-2023",
      terminates: "",
    },
    {
      name: "Agreement in queue",
      sendEmail: false,
      deparment: "Trainers",
      barcod: "akddjcns",
      address: "New Jersey",
      primary: "(551)206-4043",
      hireDates: "March-12-2023",
      terminates: "",
    },
    {
      name: "Agreement in queue",
      sendEmail: true,
      deparment: "Trainers",
      barcod: "akddjcns",
      address: "New Jersey",
      primary: "(551)206-4043",
      hireDates: "March-12-2023",
      terminates: "",
    },
    {
      name: "Agreement in queue",
      sendEmail: false,
      deparment: "Trainers",
      barcod: "akddjcns",
      address: "New Jersey",
      primary: "(551)206-4043",
      hireDates: "March-12-2023",
      terminates: "",
    },
  ];
  const manageTimesheets = [
    { field: "Club", header: "Club" },
    { field: "Employee Name", header: "Employee Name" },
    { field: "Department", header: "Department" },
    { field: "Date", header: "Date" },
    { field: "Clock In", header: "Clock In" },
    { field: "Clock Out", header: "Clock Out" },
    { field: "Duration", header: "Duration" },
    { field: "Modified On", header: "Modefied On" },
    { field: "", header: "", body: "tableActionTemplate" },
  ];
  const TimeSheetsData = [
    {
      club: "Club 33502",
      employee: "Johny",
      department: "Front Desk",
      date: "March-12-2023",
      clockin: "09:00 am",
      clockout: "06:00 pm",
      duration: "01:00 hrs",
      modifiedon: "04:00 pm",
    },
    {
      club: "Club 33502",
      employee: "John Smith",
      department: "Front Desk",
      date: "March-12-2023",
      clockin: "09:00 am",
      clockout: "06:00 pm",
      duration: "01:00 hrs",
      modifiedon: "04:00 pm",
    },
    {
      club: "Club 3502",
      employee: "John ",
      department: "Front Desk",
      date: "March-12-2023",
      clockin: "09:00 am",
      clockout: "06:00 pm",
      duration: "01:00 hrs",
      modifiedon: "04:00 pm",
    },
    {
      club: "Club 3352",
      employee: "Smith",
      department: "Front Desk",
      date: "March-12-2023",
      clockin: "09:00 am",
      clockout: "06:00 pm",
      duration: "01:00 hrs",
      modifiedon: "04:00 pm",
    },
  ];
  const departmentData = [
    {
      name: "Front Desk",
      Showincalendar: "",
      visibleonline: "",
      salespersononline: "",
    },
    {
      name: "Instructors",
      Showincalendar: "Yes",
      visibleonline: "Yes",
      salespersononline: "",
    },
    {
      name: "Maintenance",
      Showincalendar: "",
      visibleonline: "",
      salespersononline: "",
    },
    {
      name: "Management",
      Showincalendar: "",
      visibleonline: "",
      salespersononline: "",
    },
    {
      name: "Sales",
      Showincalendar: "Yes",
      visibleonline: "Yes",
      salespersononline: "",
    },
  ];
  const ManageSecurityData = [
    {
      name: "All Access",
      description: "All Access",
    },
    {
      name: "Call Center Rep L1",
      description: "Call Center Rep L1",
    },
    {
      name: "ChargebackUser",
      description: "ChargebackUser",
    },
    {
      name: "Corporate Access",
      description: "Corporate Access",
    },
    {
      name: "Data Entry",
      description: "Data Entry",
    },
  ];
  return {
    relationshipColumns,
    relationshipData,
    reasonCode,
    reasonCodeData,
    manageEmolyeeData,
    manageEmployee,
    TimeSheetsData,
    manageTimesheets,
    departmentData,
    ManageSecurityData,
    commissionTableData,
  };
};

export default dummyData;
