import React from "react";
import BlackArrow from "../../../../assets/icons/blackarrow.png";
import { OverlayPanel } from "primereact/overlaypanel";
import TableData from "../../../../components/cards/dataTable/dataTable";
import dummyData from "../../../../utils/dummyData";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../../components/input/input";
import Buttons from "../../../../components/buttons/button";
import DropDown from "../../../../components/dropdown/dropdown";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";

const Employee = () => {
  const navigate = useNavigate();
  const { manageEmployee, manageEmolyeeData } = dummyData();
  // const [isActiveColor, setIsActiveColor] = useState(false);
  const op = useRef(null);
  const ope = useRef(null);
  const navigateToAddEmployee = () => {
    navigate("/addEmployee");
  };

  return (
    <>
      <div>
        <div className="bg-lightest-blue border-round-md p-2  flex justify-content-between mb-3">
          <div className="flex p-2 justify-content-between">
            <div
              onClick={(e) => op.current.toggle(e)}
              className="col-12  bg-white cursor-pointer border-round flex justify-content-between "
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
                <div className="flex">
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
                      <Input title="Traning Level"></Input>
                    </div>
                  </div>
                </div>
                <div className="col-12 flex justify-content-end border-none">
                  <div className="col-3 border-none ">
                    <Buttons
                      label="Apply"
                      className=" p-3 btn-dark border-none "
                    ></Buttons>
                  </div>
                </div>
              </OverlayPanel>
            </div>

            <div
              onClick={(e) => ope.current.toggle(e)}
              className=" col-12 cursor-pointer bg-white border-round flex justify-content-between mx-3 "
            >
              <div className="text-sm   text-900">Hire Details</div>
              <div className=" ">
                <img
                  style={{ width: "8px", height: "7.25px" }}
                  src={BlackArrow}
                  alt=""
                />
              </div>

              <OverlayPanel ref={ope}>
                <div>
                  <div>
                    <Input title="From"></Input>
                  </div>
                  <div className="mt-3">
                    <Input title="To"></Input>
                  </div>
                </div>
                <div className="  flex justify-content-end border-none">
                  <Buttons
                    label="Apply"
                    className=" p-3 btn-dark border-none "
                  ></Buttons>
                </div>
              </OverlayPanel>
            </div>
            <div></div>
          </div>
          <div>
            <Buttons
              onClick={navigateToAddEmployee}
              label="Add Employee"
              className="btn-dark p-3 mx-2 border-none "
              icon="pi pi-plus-circle"
            ></Buttons>
          </div>
        </div>
        <div classsName="mt-3 ">
          <TableData columns={manageEmployee} data={manageEmolyeeData} />
        </div>

        <div className=" flex justify-content-end">
          <div className="col-1 ">
            <Buttons
              label="Print"
              className="bg-yellow p-3 ml-2  border-none"
              icon={
                <i className="pi pi-print " style={{ fontSize: "1rem" }}></i>
              }
            ></Buttons>
          </div>
        </div>
      </div>
      <div>
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
    </>
  );
};

export default Employee;
