import React, { useState } from "react";
import DropDown from "../../../../components/dropdown/dropdown";
import Buttons from "../../../../components/buttons/button";
import TableData from "../../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";

import AddResource from "./AddResource";

const Resource = () => {
  const [showAddResource, setAddResource] = useState(false);
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

  const ResourceColumn = [
    {
      field: "Resource Name",
      header: "Resource Name",
      id: "",
      index: "",
    },
    {
      field: "Resource Type",
      header: "Resource Type",
      id: "",
      index: "",
    },
    {
      field: "Location",
      header: "Location",
      id: "",
      index: "",
    },
    {
      field: "Available",
      header: "Available",
      id: "",
      index: "",
    },
    {
      field: "Past Due",
      header: "Past Due",
      id: "",
      index: "",
    },

    { field: "", header: "", body: actionTemplate, id: "", index: "" },
  ];
  const [ResourceData, setResourceData] = useState([
    {
      ResourceName: "Tread Mill",
      ResourceType: "Amenities",
      Location: "",
      Avaliable: "",
      PastDue: "",
      index: "",
      id: "",
    },
    {
      ResourceName: "Tread Mill",
      ResourceType: "Classes.",
      Location: "",
      Avaliable: "",
      PastDue: "",
      index: "",
      id: "",
    },
    {
      ResourceName: "Tread Mill",
      ResourceType: "Gym Floor",
      Location: "",
      Avaliable: "",
      PastDue: "",
      index: "",
      id: "",
    },
    {
      ResourceName: "Tread Mill",
      ResourceType: "Sports",
      Location: "",
      Avaliable: "",
      PastDue: "",
      index: "",
      id: "",
    },
    {
      ResourceName: "Tread Mill",
      ResourceType: "Maintenance",
      Location: "",
      Avaliable: "",
      PastDue: "",
      index: "",
      id: "",
    },
  ]);

  const openAddResource = () => {
    setAddResource((prev) => !prev);
  };

  return (
    <>
      {showAddResource ? (
        <AddResource openAddResource={openAddResource} />
      ) : (
        <>
          <div>
            <div className="my-3">
              <span className="text-xl font-bold text-900">Resource</span>
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
                      onClick={openAddResource}
                      style={{ width: "118px", height: "37px" }}
                      icon="pi pi-plus-circle"
                      className="btn-dark border-none"
                      label="Add Resource"
                    ></Buttons>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <TableData columns={ResourceColumn} data={ResourceData} />
            </div>
          </div>
          {/* <div className=" m-2 mt-3 flex justify-content-end">
            <div className="mx-3">
              <Buttons
                label="Print"
                className="bg-yellow  text-900  border-none"
                icon={
                  <i className="pi pi-print " style={{ fontSize: "1rem" }}></i>
                }
              ></Buttons>
            </div>
            <div className="">
              <Buttons
                label="Close"
                className="btn-grey text-900  border-none"
              ></Buttons>
            </div>
          </div> */}
          <div className="mt-4">
            <RecentCheckIn data={checkInData} />
          </div>
        </>
      )}
    </>
  );
};

export default Resource;
