import React, { useState } from "react";
import DropDown from "../../../../components/dropdown/dropdown";
import Input from "../../../../components/input/input";
import Buttons from "../../../../components/buttons/button";
import TableData from "../../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import AddMembershipType from "./AddMembershipType";

const ManageMembershipTypes = () => {
  const [showAddMemebershipType, setAddMemebershipType] = useState(false);

  const actionTemplate = (col) => {
    // console.log(col._id, "collllll");
    return (
      <>
        <div className="flex justify-content-end">
          <span>
            <i className="pi pi-pencil mr-3 cursor-pointer"></i>
          </span>
          <span>
            <i className="pi pi-trash cursor-pointer"></i>
          </span>
        </div>
      </>
    );
  };

  const ManageMembershipTypesColumn = [
    {
      field: "name",
      header: "Name",
      id: "",
      index: "",
    },
    {
      field: "description",
      header: "Description",
      id: "",
      index: "",
    },
    {
      field: "discount Type",
      header: "Discount Type",
      id: "",
      index: "",
    },
    {
      field: "members",
      header: "# Members",
      id: "",
      index: "",
    },
    { field: "", header: "", body: actionTemplate, id: "", index: "" },
  ];
  const [ManageMembershipTypesData, setManageMembershipTypesData] = useState([
    {
      name: "AthElite",
      description: "Gym Access & Group X Classes",
      discountType: "",
      members: "56",
      index: "",
      id: "",
    },
    {
      name: "AWA",
      description: "-",
      discountType: "",
      members: "24",
      index: "",
      id: "",
    },
    {
      name: "ClassPass",
      description: "-",
      discountType: "",
      members: "5",
      index: "",
      id: "",
    },
    {
      name: "Club Access",
      description: "GymAccess",
      discountType: "",
      members: "76",
      index: "",
      id: "",
    },
    {
      name: "COMP",
      description: "Unassigned",
      discountType: "",
      members: "4",
      index: "",
      id: "",
    },
  ]);

  const showAddMemebershipTypeScreen = () => {
    setAddMemebershipType((prev) => !prev);
  };

  return (
    <>
      {showAddMemebershipType ? (
        <AddMembershipType
          showAddMemebershipTypeScreen={showAddMemebershipTypeScreen}
        />
      ) : (
        <>
          <div>
            <div className=" flex justify-content-between bg-lightest-blue border-round-lg px-2">
              <div className="col-7 flex">
                <div className="col-3">
                  <DropDown title="Status"></DropDown>
                </div>
                <div className="col-3">
                  <Input title="TypeName"></Input>
                </div>
                <div className="mt-4 p-2 ">
                  <Buttons
                    style={{ height: "37px" }}
                    className="btn-dark border-none"
                    label="Search"
                  />
                </div>
              </div>
              <div>
                <div className="p-3 mt-2">
                  <div className="mt-3">
                    <Buttons
                      onClick={showAddMemebershipTypeScreen}
                      style={{ width: "118px", height: "37px" }}
                      icon="pi pi-plus-circle"
                      className="btn-dark border-none"
                      label="Add Membership Type"
                    ></Buttons>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <TableData
                columns={ManageMembershipTypesColumn}
                data={ManageMembershipTypesData}
              />
            </div>
          </div>
          <div className=" m-2 mt-3 flex justify-content-end">
            <div className="">
              <Buttons
                label="Close"
                className="btn-grey text-900  border-none"
              ></Buttons>
            </div>
          </div>
          <div className="mt-4">
            <RecentCheckIn data={checkInData} />
          </div>
        </>
      )}
    </>
  );
};

export default ManageMembershipTypes;
