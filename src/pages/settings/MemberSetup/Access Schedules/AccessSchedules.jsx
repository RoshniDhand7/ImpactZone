import React, { useState } from "react";
import DropDown from "../../../../components/dropdown/dropdown";
import Input from "../../../../components/input/input";
import Buttons from "../../../../components/buttons/button";
import TableData from "../../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import TabsAccessSchedules from "./TabsAccessSchedules";
import AccessSchedulesContainer from "./AccessSchedulesContainer";
import { ConfirmDialog } from "primereact/confirmdialog";

const AccessSchedules = () => {
  const {
    showAccessSchedules,
    setShowAccessSchedules,
    AccessSchedulesColumn,
    accessSchedules,
    handleAccessSchedulesChange,
    accessSchedulesForm,
    setAccessSchedulesForm,
    durations,
    onDurationChange,
    duration,
    onClickAllAccess,
    editAccessSchedule,
    resetForm,
    copyModalFooter,
    openCopyModal,
    setOpenCopyModal,
    newName,
    setNewName,
    submit,
  } = AccessSchedulesContainer();

  const actionTemplate = (col) => {
    // console.log(col._id, "collllll");
    return (
      <>
        <div className="flex justify-content-end  ">
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

  const showcomponent = () => {
    setShowAccessSchedules((prev) => !prev);
    resetForm();
  };

  return (
    <>
      <ConfirmDialog />
      {!showAccessSchedules ? (
        <TabsAccessSchedules
          showcomponent={showcomponent}
          handleAccessSchedulesChange={handleAccessSchedulesChange}
          accessSchedulesForm={accessSchedulesForm}
          setAccessSchedulesForm={setAccessSchedulesForm}
          durations={durations}
          onDurationChange={onDurationChange}
          duration={duration}
          onClickAllAccess={onClickAllAccess}
          editAccessSchedule={editAccessSchedule}
          copyModalFooter={copyModalFooter}
          openCopyModal={openCopyModal}
          setOpenCopyModal={setOpenCopyModal}
          newName={newName}
          setNewName={setNewName}
          submit={submit}
        />
      ) : (
        <>
          <div>
            <div className="my-3">
              <span className="text-xl font-bold text-900">
                Setup Central - Access Schedules
              </span>
            </div>
            <div className=" flex justify-content-between bg-lightest-blue border-round-lg px-2">
              <div className="col-7 flex">
                <div className="col-3">
                  <DropDown title="Status"></DropDown>
                </div>
              </div>
              <div>
                <div className="p-3 mt-2">
                  <div className="mt-3">
                    <Buttons
                      onClick={showcomponent}
                      style={{ width: "118px", height: "37px" }}
                      icon="pi pi-plus-circle"
                      className="btn-dark border-none"
                      label="Add Access Schedules "
                    ></Buttons>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <TableData
                columns={AccessSchedulesColumn}
                data={accessSchedules}
              />
            </div>
          </div>
          <div className=" m-2 mt-3 flex justify-content-end">
            <div className="mx-3">
              {/* <Buttons
                label="Print"
                className="bg-yellow  text-900  border-none"
                icon={
                  <i className="pi pi-print " style={{ fontSize: "1rem" }}></i>
                }
              ></Buttons> */}
            </div>
            <div className="">
              {/* <Buttons
                label="Close"
                className="btn-grey text-900  border-none"
              ></Buttons> */}
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

export default AccessSchedules;
