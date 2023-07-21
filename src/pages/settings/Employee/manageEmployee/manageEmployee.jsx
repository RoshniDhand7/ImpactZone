import React, { useState, useEffect, useRef } from "react";
import BlackArrow from "../../../../assets/icons/blackarrow.png";
import { OverlayPanel } from "primereact/overlaypanel";
import TableData from "../../../../components/cards/dataTable/dataTable";
import { useNavigate } from "react-router-dom";
import Input from "../../../../components/input/input";
import Buttons from "../../../../components/buttons/button";
import DropDown from "../../../../components/dropdown/dropdown";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";

import Navbar from "../../../../layout/Navbar";
import constants from "../../../../utils/constants";
import api from "../../../../services/api";
// import { showToast } from "../../../redux/actions/toastAction";
import { useDispatch } from "react-redux";
import { showToast } from "../../../../redux/actions/toastAction";
import {
  hideLoaderAction,
  showLoaderAction,
} from "../../../../redux/actions/loaderAction";
import {
  formatHireDate,
  formatTerminationDate,
} from "../../../../utils/helpers/dataTableCommonFunct";
import DeleteDailog from "../../../../components/popup/deleteDailog";
import ViewEmployee from "./viewEmployee";

const Employee = () => {
  const [ShowEmployee, setShowEmployee] = useState({});
  const [showViewEmployee, setViewEmployee] = useState({});
  const [visible, setVisible] = useState(false);
  const [deleteRow, setDeleteRow] = useState({
    id: null,
    isDelete: false,
  });
  const navigate = useNavigate();
  // const [isActiveColor, setIsActiveColor] = useState(false);
  const op = useRef(null);
  const ope = useRef(null);
  const navigateToAddEmployee = () => {
    navigate("/employee/addEmployee");
  };
  const navigateTOViewEmployee = () => {
    navigate("/viewEmployee");
  };
  const dispatch = useDispatch();
  const onClickviewEmployee = () => {
    setViewEmployee((prev) => !prev);
  };
  // const tableRowRemove = (index) => {
  //   const dataRow = [...manageEmolyeeData];
  //   dataRow.splice(index, 1);
  //   setManagaEmplyoee(dataRow);
  // };
  useEffect(() => {
    if (deleteRow.isDelete) deleteEmployee(deleteRow.id);
  }, [deleteRow]);
  const actionTemplate = (col) => {
    // console.log(col._id, "collllll");
    return (
      <>
        <div className="flex">
          <span onClick={onClickviewEmployee}>
            <i className="pi pi-eye mr-3 cursor-pointer"></i>
          </span>
          <span>
            <i className="pi pi-pencil mr-3 cursor-pointer"></i>
          </span>
          {/* <span onClick={() => }> */}
          <span
            onClick={() => {
              setVisible(true);
              setDeleteRow({ ...deleteRow, id: col._id });
            }}
          >
            <i className="pi pi-trash cursor-pointer"></i>
          </span>
        </div>
      </>
    );
  };

  const manageEmployeeTableColumns = [
    { field: "firstName", header: "Name", id: "", index: "" },

    { field: "barCode", header: "Barcode", id: "", index: "" },
    { field: "city", header: "Address", id: "", index: "" },
    {
      field: "primaryPhone",
      header: "Primary Phone",
      id: "",
      index: "",
    },
    {
      field: "hireDate",
      header: "Hire Date",
      id: "",
      index: "",
      body: formatHireDate,
    },
    {
      field: "terminates",
      header: "Termination Date",
      id: "",
      index: "",
      body: formatTerminationDate,
    },
    { field: "", header: "", body: actionTemplate, id: "", index: "" },
  ];
  // const [manageEmolyeeData, setManagaEmplyoee] = useState([
  //   {
  //     name: "Agreement in queue",
  //     sendEmail: true,
  //     deparment: "Trainers",
  //     barcod: "akddjcns",
  //     address: "New Jersey",
  //     primary: "(551)206-4043",
  //     hireDates: "March-12-2023",
  //     terminates: "",
  //     index: "",
  //     id: "",
  //   },
  //   {
  //     name: "Agreement in queue",
  //     sendEmail: true,
  //     deparment: "Trainers",
  //     barcod: "akddjcns",
  //     address: "New Jersey",
  //     primary: "(551)206-4043",
  //     hireDates: "March-12-2023",
  //     terminates: "",
  //     index: "",
  //     id: "",
  //   },
  //   {
  //     name: "Agreement in queue",
  //     sendEmail: false,
  //     deparment: "Trainers",
  //     barcod: "akddjcns",
  //     address: "New Jersey",
  //     primary: "(551)206-4043",
  //     hireDates: "March-12-2023",
  //     terminates: "",
  //     index: "",
  //     id: "",
  //   },
  //   {
  //     name: "Agreement in queue",
  //     sendEmail: true,
  //     deparment: "Trainers",
  //     barcod: "akddjcns",
  //     address: "New Jersey",
  //     primary: "(551)206-4043",
  //     hireDates: "March-12-2023",
  //     terminates: "",
  //     index: "",
  //     id: "",
  //   },
  //   {
  //     name: "Agreement in queue",
  //     sendEmail: false,
  //     deparment: "Trainers",
  //     barcod: "akddjcns",
  //     address: "New Jersey",
  //     primary: "(551)206-4043",
  //     hireDates: "March-12-2023",
  //     terminates: "",
  //     index: "",
  //     id: "",
  //   },
  // ]);

  const deleteEmployee = async (id) => {
    const res = await api("put", constants.endPoints.DeleteEmployee + id);
    if (res.success) {
      dispatch(showToast({ severity: "success", summary: res.message }));
      fetchEmployees();
    } else {
      dispatch(showToast({ severity: "error", summary: res.message }));
    }
  };

  const fetchEmployees = async () => {
    dispatch(showLoaderAction());
    const res = await api("get", constants.endPoints.GetEmployeeTableData);
    if (res.success) {
      setShowEmployee(res.data);
      dispatch(hideLoaderAction());
    } else {
      dispatch(hideLoaderAction());
      console.log(res);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <>
      <div className="p-3">
        <Navbar />
        <DeleteDailog
          visible={visible}
          setVisible={setVisible}
          setDeleteRow={setDeleteRow}
          deleteRow={deleteRow}
        />
        {showViewEmployee ? (
          <div className="my-2 mx-3">
            <div className="bg-lightest-blue border-round-md p-2  flex justify-content-between mb-3 ">
              <div
                className="flex p-2  justify-content-between align-items-center"
                id=""
              >
                <button
                  id="1"
                  className="btn_custom flex justify-content-between border-round-md  align-items-center  border-none "
                  style={{ height: "36px", width: "258px" }}
                  onClick={(e) => op.current.toggle(e)}
                  onChange={{}}
                >
                  General <i className="pi pi-angle-down"></i>
                </button>

                <OverlayPanel ref={op} dismissable={false}>
                  <div className="flex align-items-center ">
                    <div className="col-6">
                      <div className=" ">
                        <DropDown title="Status" placeholder="All"></DropDown>
                      </div>
                      <div className="my-2">
                        <DropDown title="Club"></DropDown>
                      </div>
                      <div className="">
                        <DropDown title="Department"></DropDown>
                      </div>
                      <div className="mt-2">
                        <DropDown title="Commission Level"></DropDown>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className=" ">
                        <Input title="First Name"></Input>
                      </div>
                      <div className="my-2">
                        <Input title="Last Name"></Input>
                      </div>
                      <div className="">
                        <Input title="Barcode"></Input>
                      </div>
                      <div className="mt-2">
                        <DropDown title="Traning Level"></DropDown>
                      </div>
                    </div>
                  </div>
                  <div className=" flex justify-content-end border-none px-3 ">
                    <div className="border-none pt-2 ">
                      <Buttons
                        label="Apply"
                        className="btn-dark border-none "
                        style={{}}
                      ></Buttons>
                    </div>
                  </div>
                </OverlayPanel>

                <button
                  id="2"
                  className="btn_custom  flex justify-content-between border-round-md  mx-5  align-items-center border-none "
                  style={{ height: "36px", width: "258px" }}
                  onClick={(e) => ope.current.toggle(e)}
                  onChange={{}}
                >
                  Hire Details <i className="pi pi-angle-down"></i>
                </button>
                <OverlayPanel ref={ope}>
                  <div>
                    <div>
                      <Input title="From" type="date"></Input>
                    </div>
                    <div className="mt-3">
                      <Input title="To" type="date"></Input>
                    </div>
                  </div>
                  <div className="  mt-3 mr-3   border-none">
                    <Buttons
                      label="Apply"
                      className="btn-dark border-none "
                    ></Buttons>
                  </div>
                </OverlayPanel>
              </div>

              <div className=" flex justify-content-center align-items-center ">
                <div className=" px-3">
                  <Buttons
                    onClick={navigateToAddEmployee}
                    label="Add Employee"
                    className="btn-dark   border-none "
                    icon="pi pi-plus-circle"
                    style={{ height: "36px" }}
                  ></Buttons>
                </div>
              </div>
            </div>
            <div classsName="mt-3 ">
              <TableData
                value={ShowEmployee}
                columns={manageEmployeeTableColumns}
                data={ShowEmployee}
              />
            </div>

            <div className=" m-2 mt-3 flex justify-content-end">
              <div className="">
                <Buttons
                  label="Print"
                  className="bg-yellow text-900  border-none"
                  icon={
                    <i
                      className="pi pi-print "
                      style={{ fontSize: "1rem" }}
                    ></i>
                  }
                ></Buttons>
              </div>
            </div>
          </div>
        ) : (
          <ViewEmployee />
        )}

        <div className="p-3">
          <RecentCheckIn data={checkInData}></RecentCheckIn>
        </div>
      </div>
    </>
  );
};

export default Employee;
