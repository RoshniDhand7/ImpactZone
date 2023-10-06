import React from "react";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import TableData from "../../../../components/cards/dataTable/dataTable";
import Input from "../../../../components/input/input";
import DropDown from "../../../../components/dropdown/dropdown";
import { useState } from "react";
import AddCampaignsGroup from "./AddCampaihnsGroup";
import CampaignsGroupContainer from "./CampaignsGroupContainer";

const CampaignsGroup = () => {
  const {
    showcomponent,
    showAddCampaignsGroup,
    CampaignsColumn,
    CampaignsData,
    handleChangeCampaignGroup,
    campaignGroupData,
  } = CampaignsGroupContainer()
  // const [showAddCampaignsGroup, setAddCampaignsGroup] = useState(false);

  // const showcomponent = () => {
  //   setAddCampaignsGroup((prev) => !prev);
  // };
  // const actionTemplate = (col) => {
  //   return (
  //     <>
  //       <div className="flex justify-content-end">
  //         <span>
  //           <i className="pi pi-pencil  mr-3 cursor-pointer"></i>
  //         </span>
  //         <span>
  //           <i className="pi pi-trash cursor-pointer"></i>
  //         </span>
  //       </div>
  //     </>
  //   );
  // };

  // const CampaignsColumn = [
  //   {
  //     field: "CampaignsGroupName",
  //     header: "Campaigns Group Name",
  //     id: "",
  //     index: "",
  //   },

  //   { field: "", header: "", body: actionTemplate, id: "", index: "" },
  // ];
  // const [CampaignsData, setCampaignsData] = useState([
  //   {
  //     CampaignsGroupName: "Black Friday",
  //     description: "",
  //     index: "",
  //     id: "",
  //   },
  //   {
  //     CampaignsGroupName: "Coffee Cup Sleeve",
  //     description: "",
  //     index: "",
  //     id: "",
  //   },
  //   {
  //     CampaignsGroupName: "Direct Mailer",
  //     description: "Direct Mail",
  //     index: "",
  //     id: "",
  //   },
  //   {
  //     CampaignsGroupName: "Google Ad or Search",
  //     description: "Google Ad or Search",
  //     index: "",
  //     id: "",
  //   },
  //   {
  //     CampaignsGroupName: "Grocery Bag",
  //     description: "",
  //     index: "",
  //     id: "",
  //   },
  // ]);

  return (
    <>
      {showAddCampaignsGroup ? (
        <AddCampaignsGroup 
        showcomponent={showcomponent} 
        handleChangeCampaignGroup={handleChangeCampaignGroup}
        campaignGroupData={campaignGroupData}
        />
      ) : (
        <>
          {" "}
          <div>
            <div className=" flex justify-content-between bg-lightest-blue border-round-lg px-2">
              <div className="col-7 flex">
                <div className="col-3">
                  <DropDown title="Status" placeholder="Active"></DropDown>
                </div>
              </div>
              <div>
                <div className="p-3 mt-2">
                  <div className="mt-3">
                    <Buttons
                      onClick={showcomponent}
                      style={{ width: "118px", height: "37px" }}
                      icon="pi pi-plus-circle "
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
        </>
      )}

      <div className="mt-4">
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default CampaignsGroup;
