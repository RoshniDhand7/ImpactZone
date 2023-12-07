import React, { useState } from "react";
import Buttons from "../../../../components/buttons/button";
import DropDown from "../../../../components/dropdown/dropdown";
import TableData from "../../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import AddAssessedFee from "../ManageAssessed/addAssessedFee";
import AssessedContainer from "./assessedContainer";
import { ConfirmDialog } from "primereact/confirmdialog";

const ManageaAssessedFees = () => {
  const {
    assessedColumn,
    allAssessedData,
    onClickAddFees,
    addAssessedFees,
    assesedInfo,
    handleChangeAssessed,
    clubs,
    AssessedPickerHandleChange,
    membershipPlan,
    save,
  } = AssessedContainer();

  return (
    <>
      {addAssessedFees ? (
        <AddAssessedFee
          onClickAddFees={onClickAddFees}
          assesedInfo={assesedInfo}
          handleChangeAssessed={handleChangeAssessed}
          clubs={clubs}
          AssessedPickerHandleChange={AssessedPickerHandleChange}
          membershipPlan={membershipPlan}
          save={save}
        />
      ) : (
        <>
          <div className="px-4">
            <ConfirmDialog />
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
                paginator
                rows={5}
                selected={false}
                selectionMode={false}
                columns={assessedColumn}
                data={allAssessedData}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ManageaAssessedFees;
