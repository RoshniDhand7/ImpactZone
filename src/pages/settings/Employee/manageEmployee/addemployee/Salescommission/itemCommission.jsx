import React from "react";
import DropDown from "../../../../../../components/dropdown/dropdown";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import CardWithTitle from "../../../../../../components/cards/cardWithTitle/cardWithTitle";
import Buttons from "../../../../../../components/buttons/button";

const ItemCommission = () => {
  return (
    <>
      <div>
        <div>
          <div className="col-2">
            <DropDown title="similar To"></DropDown>
          </div>
        </div>
        <div>
          <CardWithTitle
            title="commision Group"
            title2="commission Type"
            title3="Pay"
            title4=""
          >
            <div className="p-3 flex justify-content-between">
              <div className="col-3">
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
              </div>
              <div className="col-3">
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
              </div>
              <div className="col-2">
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
              </div>
              <div className="col-2"></div>
            </div>
          </CardWithTitle>
        </div>
        <div className="flex justify-content-end pt-2 ">
          <div className="col-3 flex  ">
            <Buttons
              label="Add"
              icon={"pi pi-plus-circle"}
              className="btn-dark p-3   border-none"
            ></Buttons>
            <Buttons
              label="Save"
              className="btn-dark p-3  mx-2  border-none"
            ></Buttons>

            <Buttons label="Cancel" className="btn-grey border-none"></Buttons>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default ItemCommission;
