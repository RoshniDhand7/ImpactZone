import React, { useState } from "react";
import Buttons from "../../../../components/buttons/button";
import DropDown from "../../../../components/dropdown/dropdown";
import TableData from "../../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import AddAssessedFee from "../ManageAssessed/addAssessedFee";
import Input from "../../../../components/input/input";
import AddMembershipPlan from "./AddMembershipPlan";

const ManagePaymentPlans = () => {
  const [addPaymentPlans, setPaymentPlans] = useState(false);

  const onClickAddFees = () => {
    setPaymentPlans((prev) => !prev);
  };
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

  const ManagePaymentPlansColumn = [
    {
      field: "planname",
      header: "Plan Name",
      id: "",
      index: "",
    },
    {
      field: "clubs",
      header: "Clubs",
      id: "",
      index: "",
    },
    {
      field: "category",
      header: "Category",
      id: "",
      index: "",
    },
    {
      field: "membershiptype",
      header: "Membershiptype",
      id: "",
      index: "",
    },
    {
      field: "noofmembers",
      header: "No.ofMembers",
      id: "",
      index: "",
    },
    {
      field: "soldonline",
      header: "Sold Online",
      id: "",
      index: "",
    },

    {
      field: "availability",
      header: "Availability",
      id: "",
      index: "",
    },
    {
      field: "",
      header: "",
      id: "",
      body: actionTemplate,
    },
  ];
  const [ManagePaymentPlansData, setManagePaymentPlansData] = useState([
    {
      planname: "Annual Fee",
      category: "Annual Fee",
      membershiptype: "$49.99",
      noofmembers: "01/03/2022",
      clubs: "30591",
      soldonline: "",
      availability: "",
    },
    {
      planname: "Late Fee",
      category: "-",
      membershiptype: "$49.99",
      noofmembers: "01/03/2022",
      clubs: "30591",
      soldonline: "",
      availability: "",
    },
    {
      planname: "Decline Fee",
      category: "-",
      membershiptype: "$49.99",
      noofmembers: "01/03/2022",
      clubs: "30591",
      soldonline: "",
      availability: "",
    },
    {
      planname: "No Show Fee",
      category: "GymAccess",
      membershiptype: "$49.99",
      noofmembers: "01/03/2022",
      clubs: "30591",
      soldonline: "",
      availability: "",
    },
    {
      planname: "Freeze Fee",
      category: "Unassigned",
      membershiptype: "$49.99",
      noofmembers: "01/03/2022",
      clubs: "30591",
      soldonline: "",
      availability: "",
    },
  ]);
  return (
    <>
      {addPaymentPlans ? (
        <AddMembershipPlan onClickAddFees={onClickAddFees} />
      ) : (
        <>
          <div>
            <div className=" flex align-items-center justify-content-between my-3">
              <span className="text-xl font-bold text-900">
                Manage Payment Plans
              </span>
              <div className=" px-2 ">
                <Buttons
                  onClick={onClickAddFees}
                  className=" btn-dark border-none"
                  label="Add Assessed Fees"
                  icon="pi pi-plus-circle"
                ></Buttons>
              </div>
            </div>
            <div className=" flex statusbar-shadow justify-content-between bg-lightest-blue border-round-lg px-2">
              <div className="col-7 flex flex-column">
                <div className="flex">
                  <div className="md:col">
                    <DropDown title="Status"></DropDown>
                  </div>
                  <div className="col">
                    <DropDown title="Category"></DropDown>
                  </div>
                  <div className="col">
                    <DropDown title="Subcategory"></DropDown>
                  </div>
                </div>
                <div className="flex mt-2">
                  <div className="col">
                    <DropDown title="Club"></DropDown>
                  </div>
                  <div className="col">
                    <Input title="Plan Name"></Input>
                  </div>
                  <div className="col">
                    <DropDown title="Web Plan"></DropDown>
                  </div>
                </div>
              </div>
              <div>
                <div className="p-3 mt-2">
                  <div className="mt-3">
                    <Buttons
                      style={{ width: "118px", height: "37px" }}
                      className="btn-dark border-none"
                      label="Search"
                    ></Buttons>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <TableData
                columns={ManagePaymentPlansColumn}
                data={ManagePaymentPlansData}
              />
            </div>
          </div>
        </>
      )}
      <div className="mt-8">
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default ManagePaymentPlans;
