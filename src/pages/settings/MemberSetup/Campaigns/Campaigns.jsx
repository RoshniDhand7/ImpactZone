import React, { useState } from "react";
import DropDown from "../../../../components/dropdown/dropdown";
import Input from "../../../../components/input/input";
import Buttons from "../../../../components/buttons/button";
import TableData from "../../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import AddCampaigns from "./AddCampaigns";

const Campaigns = () => {
  const [showAddCampaigns, setAddCampaigns] = useState(false);
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

  const CampaignsColumn = [
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
    {
      field: "members",
      header: "# Members",
      id: "",
      index: "",
    },
    { field: "", header: "", body: actionTemplate, id: "", index: "" },
  ];
  const [CampaignsData, setCampaignsData] = useState([
    {
      name: "Black Friday",
      description: "",
      members: "Signup (EAE)",
      index: "",
      id: "",
    },
    {
      name: "Coffee Cup Sleeve",
      description: "",
      members:
        "Prospect (Fast Add), Prospect (Online), Recurring Service, Signup (EAE),Signup(Fast Add) Signup (Kiosk), Signup (Online)",
      index: "",
      id: "",
    },
    {
      name: "Direct Mailer",
      description: "Direct Mail",
      members: "",
      index: "",
      id: "",
    },
    {
      name: "Google Ad or Search",
      description: "Google Ad or Search",
      members: "",
      index: "",
      id: "",
    },
    {
      name: "Grocery Bag",
      description: "",
      members: "",
      index: "",
      id: "",
    },
  ]);

  const showcomponent = () => {
    setAddCampaigns((prev) => !prev);
  };

  return (
    <>
      {showAddCampaigns ? (
        <AddCampaigns showcomponent={showcomponent} />
      ) : (
        <>
          <div>
            <div className=" flex justify-content-between bg-lightest-blue border-round-lg px-2">
              <div className="col-7 flex">
                <div className="col-3">
                  <DropDown title="Status"></DropDown>
                </div>
                <div className="col-3">
                  <Input title="Type"></Input>
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
                      label="Add Campaigns"
                    ></Buttons>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <TableData columns={CampaignsColumn} data={CampaignsData} />
            </div>
          </div>
          <div className=" m-2 mt-3 flex justify-content-end">
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
          </div>
          <div className="mt-4">
            <RecentCheckIn data={checkInData} />
          </div>
        </>
      )}
    </>
  );
};

export default Campaigns;
