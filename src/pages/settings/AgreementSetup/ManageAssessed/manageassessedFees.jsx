import React, { useState } from "react";
import Buttons from "../../../../components/buttons/button";
import DropDown from "../../../../components/dropdown/dropdown";
import TableData from "../../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import AddAssessedFee from "../ManageAssessed/addAssessedFee";

const ManageaAssessedFees = () => {
  const [addAssessedFees, setAddAssessedFee] = useState(false);

  const onClickAddFees = () => {
    setAddAssessedFee((prev) => !prev);
  };

  const ManageMembershipTypesColumn = [
    {
      field: "name",
      header: "Name",
      id: "",
      index: "",
    },
    {
      field: "profitcenter",
      header: "Profit Center",
      id: "",
      index: "",
    },
    {
      field: "amount",
      header: "Amount",
      id: "",
      index: "",
    },
    {
      field: "startdate",
      header: "Start Date",
      id: "",
      index: "",
    },
    {
      field: "clubs",
      header: "Clubs",
      id: "",
      index: "",
    },
  ];
  const [ManageMembershipTypesData, setManageMembershipTypesData] = useState([
    {
      name: "Annual Fee",
      profitcenter: "Annual Fee",
      amount: "$49.99",
      startdate: "01/03/2022",
      clubs: "30591",
      id: "",
    },
    {
      name: "Late Fee",
      profitcenter: "-",
      amount: "$49.99",
      startdate: "01/03/2022",
      clubs: "30591",
      id: "",
    },
    {
      name: "Decline Fee",
      profitcenter: "-",
      amount: "$49.99",
      startdate: "01/03/2022",
      clubs: "30591",
      id: "",
    },
    {
      name: "No Show Fee",
      profitcenter: "GymAccess",
      amount: "$49.99",
      startdate: "01/03/2022",
      clubs: "30591",
      id: "",
    },
    {
      name: "Freeze Fee",
      profitcenter: "Unassigned",
      amount: "$49.99",
      startdate: "01/03/2022",
      clubs: "30591",
      id: "",
    },
  ]);
  return (
    <>
      {addAssessedFees ? (
        <AddAssessedFee onClickAddFees={onClickAddFees} />
      ) : (
        <>
          <div>
            <div className=" flex align-items-center justify-content-between my-3">
              <span className="text-xl font-bold text-900">
                Manage Assessed Fees
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
              <div className="col-7 flex">
                <div className="col-3">
                  <DropDown title="Status"></DropDown>
                </div>
                <div className="col-3">
                  <DropDown title="Club"></DropDown>
                </div>
                <div className="col-3">
                  <DropDown title="Profit Center"></DropDown>
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
                columns={ManageMembershipTypesColumn}
                data={ManageMembershipTypesData}
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

export default ManageaAssessedFees;
