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

const AddCampaignsGroup = ({
  showcomponent,
  handleChangeCampaignGroup,
  campaignGroupData,
  onSubmit,
}) => {
  const itemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <img
          className="w-4rem shadow-2 flex-shrink-0 border-round"
          src={itemsbackword}
          alt={item.name}
        />
        <div className="flex-1 flex flex-column gap-2">
          <span className="font-bold">{item.name}</span>
          <div className="flex align-items-center gap-2">
            <i className="pi pi-tag text-sm"></i>
            <span>{item.category}</span>
          </div>
        </div>
        <span className="font-bold text-900">${item.price}</span>
      </div>
    );
  };
  return (
    <>
      <div>
        <div className="my-3">
          <span className="text-xl font-bold text-900 ">
            Add Campaign Group
          </span>
        </div>
        <div className="">
          <Checkbox
            title="Active"
            className="text-900 font-semibold"
            name="isActive"
            value={campaignGroupData.isActive}
            onChange={handleChangeCampaignGroup}
          ></Checkbox>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Add Campaign Group">
            <div className=" p-3">
              <div className="col-3">
                <Input
                  title="Name"
                  name="name"
                  value={campaignGroupData.name}
                  onChange={handleChangeCampaignGroup}
                  state={campaignGroupData}
                ></Input>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className=" m-2 mt-3 flex justify-content-end">
          <div className="mx-3" style={{ width: "105px" }}>
            <Buttons label="Save" onClick={onSubmit} className="btn-dark border-none"></Buttons>
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
    </>
  );
};

export default AddCampaignsGroup;
