import React, { useState } from "react";
import DropDown from "../../../../components/dropdown/dropdown";
import Input from "../../../../components/input/input";
import Buttons from "../../../../components/buttons/button";
import TableData from "../../../../components/cards/dataTable/dataTable";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import AddCampaigns from "./AddCampaigns";
import CampaignConatiner from "./CampaignConatiner";
import { useSelector } from "react-redux";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const Campaigns = () => {
  const CampaignsData = useSelector((state)=>state.campaign.Allcampaigns)
const {
  showAddCampaigns,
    showcomponent,
    CampaignsColumn,
    campaignsHandleChange,
    campaignsForm,
    campaignPickerHandleChange,
    AllcampaignGroupData,
    campaignSubmit,
    campaignTypeOption,
} = CampaignConatiner()

  return (
    <>
      {showAddCampaigns ? (
        <AddCampaigns 
        showcomponent={showcomponent}
        campaignsHandleChange={campaignsHandleChange}
        campaignsForm={campaignsForm}
        campaignPickerHandleChange={campaignPickerHandleChange}
        AllcampaignGroupData={AllcampaignGroupData}
        campaignSubmit={campaignSubmit}
        campaignTypeOption={campaignTypeOption}
         />
      ) : (
        <>
          <div>
          <ConfirmDialog />
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

export default Campaigns;
