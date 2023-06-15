import React, { useState } from "react";
import DropDown from "../../../components/dropdown/dropdown";
import Buttons from "../../../components/buttons/button";
import TableData from "../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../utils/checkInData";
import Checkbox from "../../../components/checkbox/checkbox";
import CardWithTitle from "../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../components/input/input";

const LocationTypes = () => {
  const [showLocationType, setshowLocationType] = useState(false);

  const locationBookingData = [
    {
      name: "Club",
      allowoverbooking: "Yes",
    },
    {
      name: "Floor Hours",
      allowoverbooking: "No",
    },
    {
      name: "Front Desk",
      allowoverbooking: "Yes",
    },
    {
      name: "Sport Zone",
      allowoverbooking: "Yes",
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
      field: "name",
      header: "Name",
    },
    {
      field: "allowoverbooking",
      header: "Allow Overbooking",
    },
    { field: "", Header: "", body: ActionEditDelete },
  ];

  const AddLocationType = () => {
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
                <div className="col-4 mx-3">
                  <Input title="Name"></Input>
                </div>
                <div className="col-4">
                  <DropDown title="Allow OverBooking"></DropDown>
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
                onClick={() => setshowLocationType(false)}
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
                    onClick={setshowLocationType}
                    label="Add"
                    className="btn-dark mx-4 border-none  "
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
