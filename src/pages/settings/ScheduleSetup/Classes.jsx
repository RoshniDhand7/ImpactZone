import React, { useState } from "react";
import Input from "../../../components/input/input";
import CardWithTitle from "../../../components/cards/cardWithTitle/cardWithTitle";
import DropDown from "../../../components/dropdown/dropdown";
import Checkbox from "../../../components/checkbox/checkbox";
import Buttons from "../../../components/buttons/button";
import RecentCheckIn from "../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../utils/checkInData";
import TableData from "../../../components/cards/dataTable/dataTable";
import Index from ".";
import MuliSelectDropDown from "../../../components/dropdown/muliSelectDropDown";
import CustomInputNumber from "../../../components/input/inputNumber";
import * as moment from "moment";
import DeleteDailog from "../../../components/popup/deleteDailog";
import { deleteClassSchedule } from "../../../redux/actions/classSchedulesAction";

const Classes = () => {
  const {
    id,
    classSchedules,
    eventsByType,
    classes,
    setClasses,
    handleClassesChange,
    locations,
    weekDays,
    schedules,
    handleClasseSchedulesChange,
    onAddNewSchedule,
    onRemoveSchedule,
    employees,
    assistants,
    assistantsList,
    onAddNewAssistant,
    onRemoveAssistant,
    handleAssistantChange,
    onSaveClass,
    showAddClasses,
    setAddClasses,
    onEditClassSchedule,
    showDelete,
    setShowDelete,
    setDeleteRow,
    setLoading,
    setId,
  } = Index();

  const actionTemplate = (data) => {
    return (
      <>
        <div className="flex justify-content-end">
          <span onClick={() => onEditClassSchedule(data)}>
            <i className="pi pi-pencil mr-3 cursor-pointer"></i>
          </span>
          <span>
            <i
              className="pi pi-trash cursor-pointer"
              onClick={() => {
                setShowDelete(true);
                setId(data._id);
              }}
            ></i>
          </span>
        </div>
      </>
    );
  };
  const ClassesColumns = [
    {
      field: "event.name",
      header: "Name",
    },
    {
      field: "classLocation.name",
      header: "Location",
    },
    {
      field: "staff.firstName",
      header: "Instructor",
    },
    {
      field: "totalCapacity",
      header: "Capacity",
    },
    {
      field: "",
      header: "",
      body: actionTemplate,
    },
  ];

  const onClickShowAddClassic = () => {
    setAddClasses((prev) => !prev);
  };

  return (
    <>
      <DeleteDailog
        visible={showDelete}
        setVisible={setShowDelete}
        setDeleteRow={setDeleteRow}
        deleteRowId={id}
        onDelete={deleteClassSchedule}
        setLoading={setLoading}
      />
      {showAddClasses ? (
        <>
          <div>
            <div className="bg-lightest-blue py-2 border-round-lg shadow-2">
              <div className="flex justify-content-between align-items-center px-3">
                <div className="col-3 px-0">
                  <DropDown
                    filter
                    placeholder="Select Class"
                    options={eventsByType}
                    optionLabel="name"
                    onChange={handleClassesChange}
                    value={classes.event}
                    name="event"
                  ></DropDown>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <CardWithTitle title="When and Where">
                <div className="p-3">
                  <div className="flex ">
                    <div className="col-4">
                      <DropDown
                        name="scheduleType"
                        title="How often does class meet?"
                        options={["One Time", "Repeated"]}
                        value={classes.scheduleType}
                        onChange={handleClassesChange}
                      ></DropDown>
                    </div>
                    <div className="col-4">
                      <DropDown
                        title="Class Location"
                        name="classLocation"
                        options={locations}
                        optionLabel="name"
                        onChange={handleClassesChange}
                        value={classes.classLocation}
                      ></DropDown>
                    </div>
                  </div>
                  <div className="flex mt-3">
                    <div className="col-4">
                      <Input
                        name="startDate"
                        type="date"
                        title="Start Date"
                        placeholder="11/08/1998"
                        onChange={handleClassesChange}
                        value={moment(classes.startDate).format("yyyy-MM-DD")}
                      ></Input>
                    </div>
                    <div className="col-4">
                      <Input
                        name="endDate"
                        type="date"
                        title="End Date"
                        placeholder="11/08/1998"
                        onChange={handleClassesChange}
                        value={moment(classes.endDate).format("yyyy-MM-DD")}
                        disabled={classes.indefinite}
                      ></Input>
                    </div>
                    <div className="col pt-5 mt-2">
                      <Checkbox
                        name="indefinite"
                        title="Indefinite"
                        className="text-900 text-sm"
                        onChange={handleClassesChange}
                        value={classes.indefinite}
                      ></Checkbox>
                    </div>
                  </div>
                  {schedules.map((schedule, index) => {
                    console.log(schedule);
                    return (
                      <div className="flex align-items-end mt-3">
                        <div className="col-4">
                          <Input
                            id={index}
                            name="startTime"
                            type="time"
                            title="Start Time"
                            placeholder="11/08/1998"
                            onChange={handleClasseSchedulesChange}
                            value={schedule.startTime}
                          ></Input>
                        </div>
                        <div className="col-4">
                          <MuliSelectDropDown
                            id={index}
                            type="date"
                            title="Days"
                            name="days"
                            placeholder="Select"
                            options={weekDays}
                            optionsLabel="name"
                            onChange={handleClasseSchedulesChange}
                            value={schedule.days}
                          ></MuliSelectDropDown>
                        </div>
                        {index === 0 ? (
                          <div className="mb-2">
                            <Buttons
                              style={{ height: "38px" }}
                              icon="pi pi-plus-circle"
                              label="Add New Schedule"
                              className="btn-dark border-none"
                              onClick={onAddNewSchedule}
                              disabled={weekDays.every((day) => day.disabled)}
                            ></Buttons>
                          </div>
                        ) : (
                          <div className="mb-3">
                            <i
                              className="pi pi-minus-circle text-gray-300"
                              onClick={() => onRemoveSchedule(index)}
                            ></i>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardWithTitle>
            </div>
            <div className="mt-3">
              <CardWithTitle title="Instructor">
                <div className="p-3">
                  <div className="flex">
                    <div className="col-4">
                      <DropDown
                        name="staff"
                        title="Staff"
                        options={employees}
                        optionLabel="firstName"
                        onChange={handleClassesChange}
                        value={classes.staff}
                      ></DropDown>
                    </div>
                    <div className="col-4">
                      <DropDown
                        title="Pay"
                        name="pay"
                        options={classes?.staff?.payments}
                        optionLabel="name"
                        onChange={handleClassesChange}
                        value={classes.pay}
                      ></DropDown>
                    </div>
                  </div>
                  {assistants.map((assistant, index) => {
                    return (
                      <div className="flex mt-3 ">
                        <div className="col-4">
                          <DropDown
                            id={index}
                            name="assistant"
                            title={`Assistant ${index + 1}`}
                            options={assistantsList}
                            optionLabel="firstName"
                            onChange={handleAssistantChange}
                            value={assistant.assistant}
                          ></DropDown>
                        </div>
                        <div className="col-4">
                          <DropDown
                            id={index}
                            title={`Assistant ${index + 1} Pay`}
                            name="assistantPay"
                            options={assistant.assistant?.payments}
                            optionLabel="name"
                            onChange={handleAssistantChange}
                            value={assistant.assistantPay}
                          ></DropDown>
                        </div>
                        {index === 0 ? (
                          <div className="pt-4 mt-2">
                            <Buttons
                              style={{ height: "38px" }}
                              className="btn-dark border-none"
                              icon="pi pi-plus-circle"
                              label="Add Assistant"
                              onClick={onAddNewAssistant}
                            ></Buttons>
                          </div>
                        ) : (
                          <div className="pt-4 mt-3">
                            <i
                              className="pi pi-minus-circle text-gray-300"
                              onClick={() => onRemoveAssistant(index)}
                            ></i>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardWithTitle>
            </div>
            <div className="mt-3">
              <CardWithTitle title="Participants">
                <div className="p-3">
                  <div className="flex">
                    <div className="col-4">
                      <CustomInputNumber
                        title="Total Capacity"
                        name="totalCapacity"
                        type="number"
                        onChange={handleClassesChange}
                        value={classes.totalCapacity}
                      ></CustomInputNumber>
                    </div>
                    <div className="col-4">
                      <CustomInputNumber
                        name="waitListCapacity"
                        type="number"
                        title="How many people can waitlist?"
                        onChange={handleClassesChange}
                        value={classes.waitListCapacity}
                      ></CustomInputNumber>
                    </div>
                  </div>
                </div>
              </CardWithTitle>
            </div>
            <div className="mt-3">
              <CardWithTitle title="Online Scheduling">
                <div className="p-3">
                  <div className="p-2 pb-0">
                    <Checkbox
                      id="onLineSignUp"
                      name="onLineSignUp"
                      title="Allow clients to sign up for this class online"
                      className="text-sm text-900"
                      onChange={handleClassesChange}
                      value={classes.onLineSignUp}
                    ></Checkbox>
                  </div>
                  <div className="mt-4 p-2 col-4">
                    <CustomInputNumber
                      title="Online Capacity"
                      name="onLineCapacity"
                      type="number"
                      onChange={handleClassesChange}
                      value={classes.onLineCapacity}
                    ></CustomInputNumber>
                  </div>
                </div>
              </CardWithTitle>
            </div>
            <div className="mt-3">
              <CardWithTitle title="Pricing">
                <div className="p-3">
                  <div className="mt-3">
                    <Checkbox
                      id="allowSignUpAndPaylater"
                      name="allowSignUpAndPaylater"
                      title="Allow clients to sign up now and pay later"
                      onChange={handleClassesChange}
                      value={classes.allowSignUpAndPaylater}
                      className="text-sm text-900"
                    ></Checkbox>
                  </div>
                  <div className="my-3">
                    <Checkbox
                      id="attendForFree"
                      name="attendForFree"
                      title="Clients can attend this class for free"
                      className="text-sm text-900"
                      onChange={handleClassesChange}
                      value={classes.attendForFree}
                    ></Checkbox>
                  </div>
                </div>
              </CardWithTitle>
            </div>
            <div className=" m-2 mt-3 flex justify-content-end">
              <div className=" mx-4">
                <Buttons
                  label="Save"
                  className="btn-dark mx-3 border-none"
                  onClick={onSaveClass}
                ></Buttons>
              </div>
              <div className="">
                <Buttons
                  onClick={onClickShowAddClassic}
                  label="Cancel"
                  className="btn-grey border-none"
                ></Buttons>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <RecentCheckIn data={checkInData}></RecentCheckIn>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="bg-lightest-blue py-2  border-round-lg ">
              <div className="flex justify-content-between align-items-center px-3">
                <div className="col-3">
                  <DropDown title="Status" placeholder="Active"></DropDown>
                </div>
                <div className="mx-5">
                  <Buttons
                    onClick={onClickShowAddClassic}
                    className="btn-dark mx-4  border-none"
                    label="Add"
                    style={{ height: "36px", top: "10px" }}
                  ></Buttons>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <TableData
                columns={ClassesColumns}
                data={classSchedules}
              ></TableData>
            </div>
          </div>
          <div className="mt-6">
            <RecentCheckIn data={checkInData}></RecentCheckIn>
          </div>
        </>
      )}
    </>
  );
};

export default Classes;
