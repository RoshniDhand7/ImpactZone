import React, { useState } from "react";
import Buttons from "../../../../components/buttons/button";
import DropDown from "../../../../components/dropdown/dropdown";
import TableData from "../../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import AddAssessedFee from "../ManageAssessed/addAssessedFee";
import AddAgreementTemplate from "./addAgreementTemplate";

const ManageAgreementTemplate = () => {
  const [showAddAgreementTemplate, setAgreementTemplate] = useState(false);

  const onClickAddFees = () => {
    setAgreementTemplate((prev) => !prev);
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

  const manageAgreementTemplatesColumns = [
    {
      field: "name",
      header: "Name",
      id: "",
      index: "",
    },
    {
      field: "club",
      header: "Club",
      id: "",
      index: "",
    },
    {
      field: "noofAgreements",
      header: "No. of Agreements",
      id: "",
      index: "",
    },
    {
      field: "",
      header: "",
      id: "",
      index: "",
      body: actionTemplate,
    },
  ];
  const [manageAgreementTemplatesData, setManageAgreementTemplatesData] =
    useState([
      {
        name: "MTM",
        club: "Club 30591",
        noofAgreements: "2",

        id: "",
      },
      {
        name: "MTM with Services",
        club: "Club 30591",
        noofAgreements: "8",

        id: "",
      },
      {
        name: "Trial",
        Club: "-",
        noofAgreements: "$5",

        id: "",
      },
      {
        name: "Web MTM",
        club: "Club 30591",
        noofAgreements: "7",

        id: "",
      },
      {
        name: "Web MTM with Services",
        club: "Club 30591",
        noofAgreements: "9",

        id: "",
      },
    ]);
  return (
    <>
      {showAddAgreementTemplate ? (
        <AddAgreementTemplate />
      ) : (
        <>
          <div>
            <div className=" flex align-items-center justify-content-between my-3">
              <span className="text-xl font-bold text-900">
                Manage Agreement Templates
              </span>
              <div className=" px-2 ">
                <Buttons
                  onClick={onClickAddFees}
                  className=" btn-dark border-none"
                  label="Add Agreement Templates"
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
                  <DropDown title="club"></DropDown>
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
                columns={manageAgreementTemplatesColumns}
                data={manageAgreementTemplatesData}
              />
            </div>
          </div>
          <div className="flex justify-content-end p-2 ">
            <div className=" mt-3 flex  ">
              <div className="">
                <Buttons
                  onClick={onClickAddFees}
                  label="Close"
                  className="btn-lightest-gray text-900  border-none"
                ></Buttons>
              </div>
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

export default ManageAgreementTemplate;
