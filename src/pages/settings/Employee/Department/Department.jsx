import React from "react";
import DropDown from "../../../../components/dropdown/dropdown";
import Buttons from "../../../../components/buttons/button";
import { useState } from "react";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import Navbar from "../../../../layout/Navbar";
import TableData from "../../../../components/cards/dataTable/dataTable";
import constants from "../../../../utils/constants";
import api from "../../../../services/api";
import { useEffect } from "react";
import AddDeparment from "./AddDepartment";
import AddEmployeeTable from "./AddEmployee";
import { useDispatch } from "react-redux";
import {
  hideLoaderAction,
  showLoaderAction,
} from "../../../../redux/actions/loaderAction";

const Department = () => {
  const dispatch = useDispatch();
  // Data for department listing
  const [departmentData, setDepartmentData] = useState({});
  // State to show add department page
  const [addDepartment, setAddDeparment] = useState(false);
  const [showDepartmentTable, setShowDepartmentTable] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  // data for payload
  const [payload, setPayload] = useState({
    name: "",
    showInCalendar: true,
    visibleOnline: true,
    salesPersonOnline: true,
    employees: [],
  });

  const handleChange = (name) => (e) => {
    // if (group?.length) {
    //   setPayload({ ...payload, [group]: { ...payload[group], [name]: e.target.value } });
    // } else {
    setPayload({ ...payload, [name]: e.target.value });
    // }
  };
  console.log(payload);

  const fetchDepartmentData = async () => {
    dispatch(showLoaderAction());
    const res = await api("get", constants.endPoints.GetDepartment);
    console.log(res, "resss");
    if (res.success) {
      setDepartmentData(res.data);
      dispatch(hideLoaderAction());
    } else {
      console.log(res);
    }
  };

  useEffect(() => {
    if (!addDepartment) {
      fetchDepartmentData();
    }
  }, []);

  // const deleteDepartmentEmployee = async (id) => {
  //   const res = await api(
  //     "put",
  //     constants.endPoints.DepartmentEmployeeDelete + id
  //   );
  //   console.log(res, "resss");
  //   if (res.success) {
  //     dispatch(showToast({ severity: "success", summary: res.message }));
  //     fetchDepartmentData();
  //   } else {
  //     dispatch(showToast({ severity: "error", summary: res.message }));
  //   }
  // };
  const actionTemplate = (col) => {
    return (
      <>
        <div className="flex justify-content-end">
          <span>
            <i className="pi pi-pencil mr-3 "></i>
          </span>
          <span>
            <i
              className="pi pi-trash cursor-pointer"
              // onClick={() => deleteDepartmentEmployee(col._id)}
            ></i>
          </span>
        </div>
      </>
    );
  };
  const visibleOnlineTemplate = (col) => {
    if (col.visibleOnline) {
      return <span>Yes</span>;
    } else {
      return <span>No</span>;
    }
  };

  const showInCalendarTemplate = (col) => {
    if (col.showInCalendar) {
      return <span>Yes</span>;
    } else {
      return <span>No</span>;
    }
  };

  const salesPersonOnlineTemplate = (col) => {
    if (col.salesPersonOnline) {
      return <span>Yes</span>;
    } else {
      return <span>No</span>;
    }
  };

  const departmentcolumn = [
    { field: "name", header: "Name", id: "", index: "" },
    {
      field: "showInCalendar",
      header: "Show in Calendar",
      id: "",
      index: "",
      body: showInCalendarTemplate,
    },
    {
      field: "visibleOnline",
      header: "Visible Online",
      id: "",
      index: "",
      body: visibleOnlineTemplate,
    },
    {
      field: "salesPersonOnline",
      header: "Sales Person Online",
      id: "",
      index: "",
      body: salesPersonOnlineTemplate,
    },
    { field: "", header: "", body: actionTemplate, id: "", index: "" },
  ];

  // const [departmentData, setManagaEmplyoee] = useState([
  //   {
  //     name: "Front Desk",
  //     Showincalendar: "",
  //     visibleonline: "",
  //     salespersononline: "",
  //   },
  //   {
  //     name: "Instructors",
  //     Showincalendar: "Yes",
  //     visibleonline: "Yes",
  //     salespersononline: "",
  //   },
  //   {
  //     name: "Maintenance",
  //     Showincalendar: "",
  //     visibleonline: "",
  //     salespersononline: "",
  //   },
  //   {
  //     name: "Management",
  //     Showincalendar: "",
  //     visibleonline: "",
  //     salespersononline: "",
  //   },
  //   {
  //     name: "Sales",
  //     Showincalendar: "Yes",
  //     visibleonline: "Yes",
  //     salespersononline: "",
  //   },
  // ]);

  const showcomponent = () => {
    setAddDeparment((prev) => !prev);
  };

  const departmentList = () => {
    return (
      <>
        <div className="p-3">
          <Navbar />
          <div className=" mt-2 bg-lightest-blue border-round-lg p-2 flex justify-content-between">
            <div className="col-3 ">
              <DropDown title="Status"></DropDown>
            </div>
            <div className=" px-3 flex justify-content-center align-items-center ">
              <Buttons
                onClick={showcomponent}
                label="Add Deparment"
                icon="pi pi-plus-circle "
                className=" btn-custom border-none btn-dark"
              >
                <i className="pi pi-plus-circle" /> Add Deparment
              </Buttons>
            </div>
          </div>
          <div>
            <div className="mt-3 ">
              <TableData
                columns={departmentcolumn}
                data={departmentData}
                value={departmentData}

                // delRow={tableRowRemove}
              />
            </div>
          </div>
          {/* <div className=" mt-3 flex justify-content-end">
          <div className="col-1">
            <Buttons label="Save" className="btn-dark  border-none"></Buttons>
          </div>
          <div className="col-1">
            <Buttons label="Cancel" className="btn-grey  border-none"></Buttons>
          </div>
        </div> */}
        </div>
      </>
    );
  };
  return (
    <>
      {showDepartmentTable ? (
        <AddEmployeeTable
          handleChange={handleChange}
          payload={payload}
          setShowDepartmentTable={setShowDepartmentTable}
          showcomponent={showcomponent}
          setPayload={setPayload}
          selectedEmployees={selectedEmployees}
          setSelectedEmployees={setSelectedEmployees}
        />
      ) : addDepartment ? (
        <AddDeparment
          fetchDepartmentData={fetchDepartmentData}
          handleChange={handleChange}
          payload={payload}
          setPayload={setPayload}
          setShowDepartmentTable={setShowDepartmentTable}
          showcomponent={showcomponent}
          selectedEmployees={selectedEmployees}
          setSelectedEmployees={setSelectedEmployees}
          setAddDeparment={setAddDeparment}
        />
      ) : (
        departmentList()
      )}
      <div className=" p-3 mt-3">
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default Department;
