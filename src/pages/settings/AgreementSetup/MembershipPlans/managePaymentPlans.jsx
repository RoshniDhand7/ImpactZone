import React, { useState } from "react";
import Buttons from "../../../../components/buttons/button";
import DropDown from "../../../../components/dropdown/dropdown";
import TableData from "../../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import AddAssessedFee from "../ManageAssessed/addAssessedFee";
import Input from "../../../../components/input/input";
import AddMembershipPlan from "./AddMembershipPlan";
import MembershipContainer from "./MembershipContainer";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const ManagePaymentPlans = () => {
  const {
    ManagePaymentPlansColumn,
    addPaymentPlans,
    onClickChangePage,
    AllMembershipPlan,
    allAgreementCategoryData,
    handleChangeMember,
    membershipForm,
    subCategoryOption,
    allClubs,
    membershipTypeData,
    allAssessedFee,
    MemberPickerHandleChange,
    showAddMemberShipService,
    setShowAddMemberShipService,
    globalFilterValue,
    setGlobalFilterValue,
    filters,
    onGlobalFilterChange,
    memberShipAddColumn,
    memberShipAddData,
    selectedRow,
    setSelectedRow,
    removeAll,
    submit
  } = MembershipContainer();

  return (
    <>
      {addPaymentPlans ? (
        <AddMembershipPlan
          onClickChangePage={onClickChangePage}
          allAgreementCategoryData={allAgreementCategoryData}
          handleChangeMember={handleChangeMember}
          membershipForm={membershipForm}
          subCategoryOption={subCategoryOption}
          allClubs={allClubs}
          membershipTypeData={membershipTypeData}
          allAssessedFee={allAssessedFee}
          MemberPickerHandleChange={MemberPickerHandleChange}
          showAddMemberShipService={showAddMemberShipService}
    setShowAddMemberShipService={setShowAddMemberShipService}
    globalFilterValue={globalFilterValue}
    setGlobalFilterValue={setGlobalFilterValue}
    filters={filters}
    onGlobalFilterChange={onGlobalFilterChange}
    memberShipAddColumn={memberShipAddColumn}
    memberShipAddData={memberShipAddData}
    selectedRow={selectedRow}
    setSelectedRow={setSelectedRow}
    removeAll={removeAll}
    submit={submit}
        />
      ) : (
        <>
          <div>
          <ConfirmDialog />
            <div className=" flex align-items-center justify-content-between my-3">
              <span className="text-xl font-bold text-900">
                Manage Payment Plans
              </span>
              <div className=" px-2 ">
                <Buttons
                  onClick={onClickChangePage}
                  className=" btn-dark border-none"
                  label="Add MemberShip Plan"
                  icon="pi pi-plus-circle"
                ></Buttons>
              </div>
            </div>
            <div className=" flex statusbar-shadow justify-content-between bg-lightest-blue border-round-lg px-2">
              <div className="col-9 flex flex-column">
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
                data={AllMembershipPlan}
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
