import React, { useEffect } from "react";
import TableData from "../../../../components/cards/dataTable/dataTable";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import Checkbox from "../../../../components/checkbox/checkbox";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import { useState } from "react";
import Input from "../../../../components/input/input";
import { useRef } from "react";
import BlackArrow from "../../../../assets/icons/blackarrow.png";
import DropDown from "../../../../components/dropdown/dropdown";
// import { useDispatch } from "react-redux";
import { OverlayPanel } from "primereact/overlaypanel";
import { Link } from "react-router-dom";
import constants from "../../../../utils/constants";
import api from "../../../../services/api";
import { useDispatch } from "react-redux";
import {
  hideLoaderAction,
  showLoaderAction,
} from "../../../../redux/actions/loaderAction";
import {
  formatTerminationDate,
  formatHireDate,
  booleanToString,
} from "../../../../utils/helpers/dataTableCommonFunct";
import { showToast } from "../../../../redux/actions/toastAction";

const ScheduleLevel = () => {
  const op = useRef(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [empId, setEmpId] = useState([]);
  const [getLevels, setGetLevels] = useState([]);
  const [showLevelTable, setShowLLevelTable] = useState(false);
  const [showEmployeeTable, setShowEmployeeTable] = useState(false);
  const [ShowEmployee, setShowEmployee] = useState({});
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    name: "",
    isActive: true,
    employees: [],
  });
  // check for edit level //
  const [isEdit, setIsEdit] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const createLevel = async () => {
    const res = await api("post", constants.endPoints.AddLevel, payload);
    console.log(res, "level");
    if (res.success) {
      dispatch(showToast({ severity: "success", summary: res.message }));
      showcomponent();
      setPayload({
        name: "",
        employees: [],
      });
    } else {
      dispatch(showToast({ severity: "error", summary: res.message }));
      console.log(res);
    }
  };
  const fetchLevels = async () => {
    dispatch(showLoaderAction());
    const res = await api(
      "get",
      `${constants.endPoints.AddLevel}?limit=${rows}&page=${currentPage}`
    );
    if (res.success) {
      setCount(res.count);
      setGetLevels(res.data);
      dispatch(hideLoaderAction());
    } else {
      console.log(res);
    }
  };

  const getEmployee = async () => {
    dispatch(showLoaderAction());
    const res = await api("get", constants.endPoints.GetEmployeeTableData);
    console.log(res, "getemployee");
    if (res.success) {
      setShowEmployee(res.data);
      dispatch(hideLoaderAction());
    } else {
      console.log(res);
    }
  };

  const deleteLevel = async (id) => {
    const res = await api("put", constants.endPoints.DeleteLevel + id);
    if (res.success) {
      dispatch(showToast({ severity: "success", summary: res.message }));
      fetchLevels();
    } else {
      dispatch(showToast({ severity: "error", summary: res.message }));
    }
  };

  const updateLevel = async (id) => {
    console.log(payload);
    const res = await api("put", constants.endPoints.UpdateLevel + id, {
      name: payload.name,
      employees: selectedEmployees,
    });
    if (res.success) {
      dispatch(showToast({ severity: "success", summary: res.message }));
      setIsEdit(false);
      showcomponent();
      setPayload({
        name: "",
        employee: [],
      });
      fetchLevels();
    } else {
      fetchLevels();
      dispatch(showToast({ severity: "error", summary: res.message }));
    }
  };

  useEffect(() => {
    fetchLevels();
    if (showEmployeeTable) {
      getEmployee();
    }
  }, [showEmployeeTable, rows, currentPage]);

  const handleChange = (name) => (e) => {
    setPayload({ ...payload, [name]: e.target.value });
  };

  // const onClickSave = () => {
  //   createLevel();
  //   setPayload({
  //     name: "",
  //     employees: [],
  //   });
  //   // showcomponent();
  // };
  const showcomponent = () => {
    setShowLLevelTable((prev) => !prev);
    fetchLevels();
  };

  const addEmployees = () => {
    setPayload({ ...payload, employees: empId });
    setShowEmployeeTable(false);
  };

  // const dispatch = useDispatch();
  const leveldata = [
    {
      name: "1",
      value: "1",
      active: "No",
    },
    {
      name: "2",
      value: "1",
      active: "Yes",
      AddLevel: "",
    },
    {
      name: "3",
      value: "1",
      active: "Yes",
      AddLevel: "",
    },
    {
      name: "4",
      value: "1",
      active: "Yes",
      AddLevel: "",
    },
  ];

  const actionTemplate = (col) => {
    return (
      <>
        <div className="flex justify-content-end">
          <span>
            <i
              onClick={() => onClickEdit(col)}
              className="pi pi-pencil mr-3 "
            ></i>
          </span>
          <span onClick={() => deleteLevel(col._id)}>
            <i className="pi pi-trash"></i>
          </span>
        </div>
      </>
    );
  };

  const onClickEdit = (row) => {
    setIsEdit(true);
    setPayload({ ...row });
    showcomponent();
  };

  const hitApiButton = () => {
    if (isEdit) {
      updateLevel(payload._id);
    } else {
      createLevel();
    }
  };

  const levelcolumn = [
    { field: "name", header: "Name", id: "", index: "" },
    {
      field: "isActive",
      header: "Active",
      id: "",
      index: "",
      body: booleanToString,
    },
    { field: "", header: "", id: "", index: "" },
    { field: "", header: "", body: actionTemplate, id: "", index: "" },
  ];

  const ScheduleLevel = () => {
    return (
      <>
        <div className="" style={{ minHeight: "475px" }}>
          <div>
            <TableData
              columns={levelcolumn}
              data={getLevels}
              first={first}
              setFirst={setFirst}
              rows={rows}
              setRows={setRows}
              count={count}
              setCurrentPage={setCurrentPage}
            />
          </div>
          <div>
            <div className="flex justify-content-end p-2 ">
              <div className=" mt-3 flex  ">
                <div className="mx-3">
                  <Buttons
                    onClick={showcomponent}
                    label="Add Level"
                    className="btn-dark px-4  border-none"
                  ></Buttons>
                </div>

                <Link to="/schedulingoptions">
                  <div className=" ">
                    <Buttons
                      label="Scheduling Options"
                      className="btn-dark  border-none"
                    ></Buttons>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const AddLevel = () => {
    return (
      <>
        <div style={{ minHeight: "455px" }}>
          <div>
            <span className="text-xl font-bold text-900 ">Add Level</span>
          </div>
          <div className="p-3 ">
            <Checkbox
              onChange={handleChange("isActive")}
              value={payload.isActive}
              title="Active"
            ></Checkbox>
          </div>
          <div>
            <CardWithTitle title="Personal">
              <div className="flex justify-content-between p-3">
                <div className=" flex">
                  <div className="col mr-3">
                    <Input
                      value={payload.name}
                      onChange={handleChange("name")}
                      title="Name"
                    ></Input>
                  </div>
                </div>
              </div>
            </CardWithTitle>
          </div>
          <div className="my-3">
            <CardWithTitle title="Add Employee">
              <div className=" p-4 btn-lightest-blue">
                <div className="ml-4 mb-2">
                  <span className="text-xs font-semibold  text-dark-gray">
                    Name
                  </span>
                </div>

                <div className="bg-white col-12 border-round-md ">
                  <div
                    className="flex justify-content-between  "
                    style={{ height: "190px" }}
                  >
                    {/* <div className="">
                    <span className=""></span>
                  </div> */}
                    <div className="flex justify-content-center   w-5  ">
                      <div className="text-xs flex flex-column justify-content-start font-semibold  w-12">
                        <table style={{ width: "100%", textAlign: "top" }}>
                          {selectedEmployees.length ? (
                            selectedEmployees?.map((emp, index) => {
                              return (
                                <tr className="">
                                  <td>{emp.firstName + " " + emp.lastName}</td>
                                </tr>
                              );
                            })
                          ) : (
                            <>
                              <div className="mt-6">
                                <div
                                  style={{ height: "auto" }}
                                  className="flex  align-items-center  mt-6  justify-content-center"
                                >
                                  None Found
                                </div>
                              </div>
                            </>
                          )}
                        </table>
                      </div>
                    </div>
                    <div className=" flex flex-column  justify-content-center mx-3 ">
                      <div className=" ">
                        <Buttons
                          onClick={setShowEmployeeTable}
                          label="Add"
                          className="btn-dark border-none  "
                        ></Buttons>
                      </div>

                      <div className="my-3">
                        <Buttons
                          onClick={setShowEmployeeTable}
                          disabled={!selectedEmployees.length}
                          label="Edit"
                          className="btn-dark border-none  "
                        ></Buttons>
                      </div>

                      <div className="">
                        <Buttons
                          label="Remove All"
                          className="btn-dark border-none "
                          onClick={() => {
                            setSelectedEmployees([]);
                            setPayload({ ...payload, employees: [] });
                          }}
                        ></Buttons>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardWithTitle>
          </div>
          <div className="flex justify-content-end mt-3 p-2 ">
            <div className=" mx-3" style={{ width: "105px" }}>
              <Buttons
                // onClick={onClickSave}
                onClick={hitApiButton}
                className="btn-dark border-none"
                label="Save"
              ></Buttons>
            </div>

            <Buttons
              onClick={() => {
                showcomponent();
                setPayload({
                  title: "",
                  description: "",
                });
                setSelectedEmployees([]);
                setIsEdit(false);
              }}
              label="Cancel "
              className="btn-grey border-none"
              style={{ height: "40px" }}
            ></Buttons>
          </div>
        </div>
      </>
    );
  };

  const AddEmployeeTable = () => {
    return (
      <>
        <div className="bg-lightest-blue border-round-md p-2  flex justify-content-between mb-3">
          <div className="flex p-2 justify-content-between">
            <div
              style={{ width: "297px", height: "40px" }}
              onClick={(e) => op.current.toggle(e)}
              className=" bg-white p-2  cursor-pointer border-round flex justify-content-between align-items-center "
            >
              <div className=" text-sm text-900 ">Filter</div>
              <div className="ml-3">
                <img
                  style={{ width: "8px", height: "7.25px" }}
                  src={BlackArrow}
                  alt=""
                />
              </div>
              <OverlayPanel ref={op} dismissable={false}>
                <div className="flex ">
                  <div className="col-6">
                    <div className=" ">
                      <DropDown
                        title="Training Level"
                        placeholder="All"
                      ></DropDown>
                    </div>
                    <div className="my-2">
                      <DropDown title="Email Address"></DropDown>
                    </div>
                    <div className="">
                      <DropDown title="Status"></DropDown>
                    </div>
                    <div className="mt-2">
                      <DropDown title="Club"></DropDown>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className=" ">
                      <DropDown title="Department"></DropDown>
                    </div>
                    <div className="my-2">
                      <DropDown title="Commission Level"></DropDown>
                    </div>
                    <div className="">
                      <DropDown title="Visible Online:"></DropDown>
                    </div>
                    <div className="mt-2">
                      <Input type="date" title="Hire Date Range"></Input>
                    </div>
                  </div>
                </div>
                <div className=" flex justify-content-end border-none px-3 ">
                  <div className="border-none pt-2 ">
                    <Buttons
                      label="Apply"
                      className="btn-dark border-none"
                      style={{}}
                    ></Buttons>
                  </div>
                </div>
              </OverlayPanel>
            </div>
          </div>
          <div className=" flex justify-content-center align-items-center ">
            <div className=" px-3">
              <Input icon="pi pi-search" placeholder="Search"></Input>
            </div>
          </div>
        </div>
        <div>
          <div>
            <TableData
              selectionMode="checkbox"
              value={ShowEmployee}
              data={ShowEmployee}
              columns={levelEmployeecolumn}
              selected={selectedEmployees}
              changeSelection={(e) => {
                setSelectedEmployees(e.value);
                let empIds = e.value.map((emp) => {
                  return emp._id;
                });
                setEmpId(empIds);
              }}
              key="_id"
            ></TableData>
          </div>
        </div>
        <div className="flex justify-content-end mt-3 p-2 ">
          <div className=" mx-3">
            <Buttons
              onClick={addEmployees}
              className="btn-dark border-none"
              label="Add"
            ></Buttons>
          </div>
          <Buttons
            onClick={() => setShowEmployeeTable(false)}
            className="btn-grey border-none"
            label="Cancel"
          ></Buttons>
        </div>
      </>
    );
  };

  // const emailIconTemplate = (col) => {
  //   return col.sendEmail ? <i className="pi pi-envelope"></i> : null;
  // };

  const addressTemplate = (col) => {
    console.log(col);
    col.address = `${col.street} ${col.city} ${col.state} ${col.zipCode}`;
    return col.address;
  };

  const levelEmployeecolumn = [
    { field: "", header: "" },
    { field: "firstName", header: "Name", sorting: true },
    // { field: "department", header: "Department" },
    { field: "barCode", header: "Barcode" },
    {
      field: "address",
      header: "Address/City/State/Zip",
      body: addressTemplate,
    },
    { field: "primaryPhone", header: "Primary Phone" },
    { field: "hireDate", header: "Hire Date", body: formatHireDate },
    {
      field: "terminationDate",
      header: "Termination Date",
      body: formatTerminationDate,
    },
  ];

  const levelEmployeeTable = [
    {
      name: "ABC Employee",
      department: "-",
      barcode: "abcemployee",
      address: "-",
      primaryphone: "(551) 206-4043",
      hiredate: "March-12- 2023",
      terminationdate: "",
      sendEmail: "true",
    },
    {
      name: "Aga Klecha",
      department: "Trainers",
      barcode: "abcemployee",
      address: "aklecha30591",
      primaryphone: "(551) 206-4043",
      hiredate: "March-12- 2023",
      terminationdate: "",
      sendEmail: "true",
    },
    {
      name: "ABC Employee",
      department: "-",
      barcode: "abcemployee",
      address: "-",
      primaryphone: "(551) 206-4043",
      hiredate: "March-12- 2023",
      terminationdate: "",
      sendEmail: "true",
    },
  ];

  return (
    <>
      {showEmployeeTable
        ? AddEmployeeTable()
        : showLevelTable
        ? AddLevel()
        : ScheduleLevel()}

      <div className="p-2">
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default ScheduleLevel;
