import React, { useState } from "react";
import DropDown from "../../../components/dropdown/dropdown";
import Buttons from "../../../components/buttons/button";
import TableData from "../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../utils/checkInData";
import Checkbox from "../../../components/checkbox/checkbox";
import CardWithTitle from "../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../components/input/input";
import Index from ".";
import { booleanToString } from "../../../utils/javascript";
import DeleteDailog from "../../../components/popup/deleteDailog";
import { deleteLocationType } from "../../../redux/actions/locationsActions";

const LocationTypes = () => {
  const {
    locationTypes,
    locationType,
    handleLocationTypeChange,
    onAddLocationType,
    showLocationType,
    setshowLocationType,
    onEditLocationType,
    id,
    setId,
    setLocationType,
    showDelete,
    setShowDelete,
    setLoading,
    setDeleteRow,
  } = Index();

  const allowOverBookingTemplate = (d) => {
    return <>{d.allowOverBooking ? "Yes" : "No"}</>;
  };

  const editDeleteLocationType = (data) => {
    return (
      <>
        <div className="flex justify-content-end">
          <span className="mr-3">
            <i
              className="pi pi-pencil"
              onClick={() => onEditLocationType(data)}
            ></i>
          </span>

          <span>
            <i
              className="pi pi-trash"
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

  const statusTemplate = (data) => {
    return data.isActive ? "Active" : "Inactive";
  };

  const locationTypesTable = [
    {
      field: "name",
      header: "Name",
    },
    {
      header: "Allow Overbooking",
      body: allowOverBookingTemplate,
    },
    {
      body: statusTemplate,
      header: "Status",
    },
    { field: "", Header: "", body: editDeleteLocationType },
  ];

  const AddLocationType = () => {
    return (
      <>
        <div>
          <div className="my-3">
            <Checkbox
              title="Active"
              className="text-900 text-sm font-semibold"
              name="isActive"
              value={locationType.isActive}
              onChange={handleLocationTypeChange}
            ></Checkbox>
          </div>
          <div>
            <CardWithTitle title="Add Location Type">
              <div className="flex p-2">
                <div className="col-4 mx-3">
                  <Input
                    value={locationType.name}
                    title="Name"
                    name="name"
                    onChange={handleLocationTypeChange}
                  ></Input>
                </div>
                <div className="col-4">
                  <DropDown
                    title="Allow OverBooking"
                    value={booleanToString(locationType.allowOverBooking)}
                    name="allowOverBooking"
                    placeholder="Select Over Booking"
                    options={["Yes", "No"]}
                    onChange={handleLocationTypeChange}
                  ></DropDown>
                </div>
              </div>
            </CardWithTitle>
          </div>
          <div className=" m-2 mt-3 flex justify-content-end">
            <div className="mx-4">
              <Buttons
                label="Save"
                className="btn-dark  mx-3  border-none"
                onClick={onAddLocationType}
              ></Buttons>
            </div>
            <div className="">
              <Buttons
                onClick={() => {
                  setshowLocationType(false);
                  setLocationType({
                    isActive: null,
                    name: "",
                    allowOverBooking: "",
                  });
                }}
                label="Cancel"
                className="btn-grey   border-none"
              ></Buttons>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <RecentCheckIn data={checkInData}></RecentCheckIn>
        </div>
      </>
    );
  };

  return (
    <>
      <DeleteDailog
        visible={showDelete}
        setVisible={setShowDelete}
        setDeleteRow={setDeleteRow}
        deleteRowId={id}
        onDelete={deleteLocationType}
        setLoading={setLoading}
      />
      {showLocationType ? (
        AddLocationType()
      ) : (
        <>
          <div>
            <div className="bg-lightest-blue border-round-lg py-2 px-3 flex justify-content-between align-items-center ">
              <div className=" flex align-items-center">
                <div className="col-12 ">
                  <DropDown title="Status"></DropDown>
                </div>
                <div className="">
                  <Buttons
                    label="Search"
                    className="btn-dark  border-none"
                    style={{ height: "36px", top: "10px" }}
                  ></Buttons>
                </div>
              </div>
              <div className="mr-5">
                <div className="">
                  <Buttons
                    onClick={() => {
                      setshowLocationType(true);
                      setId("");
                    }}
                    label="Add"
                    className="btn-dark mx-4 border-none  "
                    style={{ height: "36px", top: "10px" }}
                  ></Buttons>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <TableData
                data={locationTypes}
                columns={locationTypesTable}
              ></TableData>
            </div>
            <div className=" m-2 mt-3 flex justify-content-end">
              <div className="">
                <Buttons
                  label="Scheduling Options"
                  className="btn-dark   border-none"
                ></Buttons>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <RecentCheckIn data={checkInData} />
          </div>
        </>
      )}
    </>
  );
};

export default LocationTypes;
