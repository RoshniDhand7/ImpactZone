import React, { useState } from "react";
import DropDown from "../../../../components/dropdown/dropdown";
import Buttons from "../../../../components/buttons/button";
import TableData from "../../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import AddResourceType from "./AddResourceType";

const ResourceType = () => {
  const [showAddResourceType, setAddResourceType] = useState(false);
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

  const ResourceTypeColumn = [
    {
      field: "name",
      header: "Name",
      id: "",
      index: "",
    },
    {
      field: "description",
      header: "Description",
      id: "",
      index: "",
    },

    { field: "", header: "", body: actionTemplate, id: "", index: "" },
  ];
  const [ResourceTypeData, setResourceTypeData] = useState([
    {
      name: "All Access",
      description: "Access on every day at all times.",
      index: "",
      id: "",
    },
    {
      name: "Class Pass",
      description: "Can only use gym when put in class",
      index: "",
      id: "",
    },
    {
      name: "Kids Fitness",
      description: "Can only use gym for kids academy",
      index: "",
      id: "",
    },
    {
      name: "No Access",
      description: "No access on any day at any time",

      index: "",
      id: "",
    },
    {
      name: "Online Client",
      description: "",
      index: "",
      id: "",
    },
  ]);

  const openADDResourceType = () => {
    setAddResourceType((prev) => !prev);
  };

  return (
    <>
      {showAddResourceType ? (
        <AddResourceType openADDResourceType={openADDResourceType} />
      ) : (
        <>
          <div>
            <div className="my-3">
              <span className="text-xl font-bold text-900">Resource Type</span>
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
                      onClick={openADDResourceType}
                      style={{ width: "118px", height: "37px" }}
                      icon="pi pi-plus-circle"
                      className="btn-dark border-none"
                      label="Add Resource Type"
                    ></Buttons>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <TableData columns={ResourceTypeColumn} data={ResourceTypeData} />
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

export default ResourceType;
