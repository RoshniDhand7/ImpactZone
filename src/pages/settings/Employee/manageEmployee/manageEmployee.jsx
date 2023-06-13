import React, { useState } from "react";
import BlackArrow from "../../../../assets/icons/blackarrow.png";
import { OverlayPanel } from "primereact/overlaypanel";
import TableData from "../../../../components/cards/dataTable/dataTable";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../../components/input/input";
import Buttons from "../../../../components/buttons/button";
import DropDown from "../../../../components/dropdown/dropdown";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import Navbar from "../../../../layout/Navbar";

const Employee = () => {
  const { products } = useState();
  const navigate = useNavigate();
  // const [isActiveColor, setIsActiveColor] = useState(false);
  const op = useRef(null);
  const ope = useRef(null);
  const navigateToAddEmployee = () => {
    navigate("/addEmployee");
  };

  const tableRowRemove = (index) => {
    const dataRow = [...manageEmolyeeData];
    dataRow.splice(index, 1);
    setManagaEmplyoee(dataRow);
  };

  const actionTemplate = (col) => {
    return (
      <>
        <span>
          <i className="pi pi-pencil mr-3 "></i>
        </span>
        <span onclick={tableRowRemove}>
          <i className="pi pi-trash"></i>
        </span>
      </>
    );
  };

  const emailIconTemplate = (col) => {
    return col.sendEmail ? <i className="pi pi-envelope"></i> : null;
  };

  const manageEmployee = [
    { field: "", header: "", body: emailIconTemplate, id: "", index: "" },
    { field: "name", header: "Name", id: "", index: "" },
    { field: "deparment", header: "Deparment", id: "", index: "" },
    { field: "barcod", header: "Barcode", id: "", index: "" },
    { field: "address", header: "Address", id: "", index: "" },
    { field: "primary", header: "Primary Phone", id: "", index: "" },
    { field: "hireDates", header: "Hire Date", id: "", index: "" },
    { field: "terminates", header: "Termination Date", id: "", index: "" },
    { field: "", header: "", body: actionTemplate, id: "", index: "" },
  ];
  const [manageEmolyeeData, setManagaEmplyoee] = useState([
    {
      name: "Agreement in queue",
      sendEmail: true,
      deparment: "Trainers",
      barcod: "akddjcns",
      address: "New Jersey",
      primary: "(551)206-4043",
      hireDates: "March-12-2023",
      terminates: "",
      index: "",
      id: "",
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
      index: "",
      id: "",
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
      index: "",
      id: "",
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
      index: "",
      id: "",
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
      index: "",
      id: "",
    },
  ]);

  return (
    <>
      <div className="p-3">
        <Navbar />
        <div className="my-2">
          <div className="bg-lightest-blue border-round-md p-2  flex justify-content-between mb-3">
            <div className="flex p-2  justify-content-between align-items-center ">
              <div
                onClick={(e) => op.current.toggle(e)}
                className="col-12 bg-white align-items-center   cursor-pointer border-round flex justify-content-between "
              >
                <div className="text-sm text-900">General</div>
                <div className="">
                  <img
                    style={{ width: "8px", height: "7.25px" }}
                    src={BlackArrow}
                    alt=""
                  />
                </div>
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
                        className="btn-dark border-none"
                        style={{}}
                      ></Buttons>
                    </div>
                  </div>
                </OverlayPanel>
              </div>

              <div
                onClick={(e) => ope.current.toggle(e)}
                className=" col-12  cursor-pointer bg-white border-round flex justify-content-between align-items-center  mx-3 "
              >
                <div className="text-sm   text-900">Hire Details</div>
                <div className="  ">
                  <img
                    style={{ width: "8px", height: "7.25px" }}
                    src={BlackArrow}
                    alt=""
                  />
                </div>

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
            </div>
            <div className=" flex justify-content-center align-items-center ">
              <div className=" px-3">
                <Buttons
                  onClick={navigateToAddEmployee}
                  label="Add Employee"
                  className="btn-dark   border-none "
                  icon="pi pi-plus-circle"
                  // style={{
                  //   padding: "10px 16px 10px 16px",
                  //   fontSize: "12px !important",
                  // }}
                  style={{ height: "36px" }}
                ></Buttons>
              </div>
            </div>
          </div>
          <div classsName="mt-3 ">
            <TableData
              value={products}
              columns={manageEmployee}
              data={manageEmolyeeData}
              delRow={tableRowRemove}
            />
          </div>

          <div className=" m-2 mt-3 flex justify-content-end">
            <div className="">
              <Buttons
                label="Print"
                className="bg-yellow text-900  border-none"
                icon={
                  <i className="pi pi-print " style={{ fontSize: "1rem" }}></i>
                }
              ></Buttons>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
    </>
  );
};

export default Employee;
