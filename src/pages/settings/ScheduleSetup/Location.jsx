import React, { useState } from "react";
import Checkbox from "../../../components/checkbox/checkbox";
import CardWithTitle from "../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../components/input/input";
import DropDown from "../../../components/dropdown/dropdown";
import Buttons from "../../../components/buttons/button";
import RecentCheckIn from "../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../utils/checkInData";
import TableData from "../../../components/cards/dataTable/dataTable";

const Location = () => {
  const [showLocation, setshowLocation] = useState(false);

  const locationBookingData = [
    {
      locationname: "Club",
      locationtype: "Club",
      club: "Club 30591",
    },
    {
      locationname: "Location-Group-Zone",
      locationtype: "Club",
      club: "Club 30591",
    },
    {
      locationname: "Club",
      locationtype: "Club",
      club: "Club 30591",
    },
    {
      locationname: "Location-Group-Zone",
      locationtype: "Club",
      club: "Club 30591",
    },
  ];
  const ActionEditDelete = () => {
    return (
      <>
        <div className="flex justify-content-end">
          <span className="mx-2">
            <i className="pi pi-pencil"></i>
          </span>

          <span>
            <i className="pi pi-trash"></i>
          </span>
        </div>
      </>
    );
  };

  const locationBookingTable = [
    {
      field: "locationname",
      header: "LocationName",
    },
    {
      field: "locationtype",
      header: "Location Type",
    },
    {
      field: "club",
      header: "Club",
    },
    { field: "", Header: "", body: ActionEditDelete },
  ];

  const AddLocation = () => {
    return (
      <>
        <div>
          <div className="my-3">
            <Checkbox
              title="Active"
              className="text-900 text-sm font-semibold"
            ></Checkbox>
          </div>
          <div>
            <CardWithTitle title="Add Location Type">
              <div className="flex p-2">
                <div className="col-3 mx-3">
                  <Input title="Name"></Input>
                </div>
                <div className="col-3">
                  <DropDown title="Location Type"></DropDown>
                </div>
                <div className="col-3">
                  <DropDown title="Club"></DropDown>
                </div>
              </div>
            </CardWithTitle>
          </div>
          <div className=" m-2 mt-3 flex justify-content-end">
            <div className="mx-4">
              <Buttons
                label="Save"
                className="btn-dark  mx-3  border-none"
              ></Buttons>
            </div>
            <div className="">
              <Buttons
                onClick={() => setshowLocation(false)}
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
      {showLocation ? (
        AddLocation()
      ) : (
        <>
          <div>
            <div className="bg-lightest-blue border-round-lg px-3 flex justify-content-between align-items-center ">
              <div className=" flex align-items-center">
                <div className="col-4 ">
                  <DropDown title="Status"></DropDown>
                </div>
                <div className="col-4 ">
                  <DropDown title="Club"></DropDown>
                </div>
                <div className="col-4 ">
                  <DropDown title="Location Type"></DropDown>
                </div>
                <div className="">
                  <Buttons
                    label="Search"
                    className="btn-dark border-none"
                    style={{ height: "36px", top: "10px" }}
                  ></Buttons>
                </div>
              </div>
              <div className="mr-2">
                <div className="">
                  <Buttons
                    onClick={setshowLocation}
                    label="Add"
                    className="btn-dark border-none  "
                    style={{ height: "36px", top: "10px" }}
                  ></Buttons>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <TableData
                data={locationBookingData}
                columns={locationBookingTable}
              ></TableData>
            </div>
            <div className=" m-2 mt-3 flex justify-content-end">
              <div className="mx-3">
                <Buttons
                  label="Company Options"
                  className="btn-dark   border-none"
                ></Buttons>
              </div>
              <div className="">
                <Buttons
                  label="Club Options"
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

export default Location;
