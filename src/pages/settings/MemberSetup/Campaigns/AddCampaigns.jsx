import React from "react";
import Checkbox from "../../../../components/checkbox/checkbox";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import itemsbackword from "../../../../assets/icons/itembackward.png";
import { InputTextarea } from "primereact/inputtextarea";
import Input from "../../../../components/input/input";
import { PickList } from "primereact/picklist";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import DropDown from "../../../../components/dropdown/dropdown";
import { useSelector } from "react-redux";

const AddCampaigns = ({
  showcomponent,
  campaignsHandleChange,
  campaignsForm,
  campaignPickerHandleChange,
  AllcampaignGroupData,
  campaignSubmit,
  campaignTypeOption
}) => {
  
  const itemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex flex-column gap-2">
          <span className="">{item}</span>
        </div>
      </div>
    );
  };
  return (
    <>
      <div>
        <div className="my-3">
          <span className="text-xl font-bold text-900 ">Add Campaign</span>
        </div>
        <div className="">
          <Checkbox
            title="Active"
            className="text-900 font-semibold"
            name="isActive"
            value={campaignsForm.isActive}
            onChange={campaignsHandleChange}
          ></Checkbox>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Add campaign Details ">
            <div className=" p-3">
              <div className="flex ">
                <div className="col-3">
                  <Input
                    title="Name"
                    name="name"
                    value={campaignsForm.name}
                    onChange={campaignsHandleChange}
                    state={campaignsForm}
                  ></Input>
                </div>
                <div className="col-3">
                  <DropDown
                    title="Campaign Group"
                    name="campaignGroup"
                    options={AllcampaignGroupData}
                    optionLabel="label"
                    value={campaignsForm.campaignGroup}
                    onChange={campaignsHandleChange}
                    state={campaignsForm}
                  ></DropDown>
                </div>
              </div>
              <div>
                <div className="col-12 flex flex-column gap-2 ">
                  <label
                    className="text-xs text-gray-500 font-semibold gap-2"
                    htmlFor=""
                  >
                    Description ({campaignsForm?.description?.length}/256)
                  </label>
                  <div className="">
                    <InputTextarea
                      name="description"
                      value={campaignsForm.description}
                      onChange={(e)=> e.target.value.length > 256 ? null : campaignsHandleChange({name:e.target.name,value:e.target.value})}
                      state={campaignsForm}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div
            className="text-danger"
            style={{ color: "red",}}
          >
            {campaignsForm?.formErrors?.description}
          </div>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="my-3">
          <CardWithTitle title="Campaign Types">
            <div className="card p-3 ">
              <PickList
                source={campaignTypeOption}
                target={campaignsForm.campaignTypes}
                onChange={(e) =>
                  campaignPickerHandleChange({
                    name: "campaignTypes",
                    value: e.target,
                    source: e.source,
                  })
                }
                itemTemplate={itemTemplate}
                breakpoint=""
                sourceHeader="Available"
                targetHeader="Selected"
                sourceStyle={{ height: "30rem" }}
                targetStyle={{ height: "30rem" }}
              />
            </div>
          </CardWithTitle>
          <div
            className="text-danger"
            style={{ color: "red", marginTop: "0.8rem" }}
          >
            {campaignsForm?.formErrors?.campaignTypes}
          </div>
        </div>
        <div className=" m-2 mt-3 flex justify-content-end">
          <div className="mx-3" style={{ width: "105px" }}>
            <Buttons label="Save" onClick={campaignSubmit} className="btn-dark border-none"></Buttons>
          </div>
          <div className="">
            <Buttons
              onClick={showcomponent}
              label="Cancel"
              className="btn-grey   border-none"
            ></Buttons>
          </div>
        </div>
      </div>
      <div>
        <RecentCheckIn data={checkInData}></RecentCheckIn>
      </div>
    </>
  );
};

export default AddCampaigns;
