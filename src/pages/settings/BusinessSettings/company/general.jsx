import React from "react";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import DropDown from "../../../../components/dropdown/dropdown";
import Buttons from "../../../../components/buttons/button";
import RecentCheckIn from "../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../utils/checkInData";
import chartData from "../../../../components/cards/graphcards/activemember";

export const General = () => {
  return (
    <>
      <div>
        <CardWithTitle title="Genral">
          <div className="p-3">
            <div className="flex justify-content-between ">
              <div className="col-4">
                <Input title="Company Id"></Input>
              </div>
              <div className="col-4">
                <Input title="Billing Country"></Input>
              </div>
              <div className="col-4">
                <Input title="Company Name"></Input>
              </div>
            </div>
            <div className="flex  justify-content-between ">
              <div className="col-4">
                <DropDown title="Brand"></DropDown>
              </div>
              <div className="col-4">
                <DropDown title="Show Scheduling Menus"></DropDown>
              </div>
              <div className="col-4">
                <DropDown title="Allow Multi-Club Clock In/Out"></DropDown>
              </div>
            </div>
            <div className="flex  justify-content-between ">
              <div className="col-4">
                <DropDown title="Clock In Department Required"></DropDown>
              </div>
              <div className="col-4">
                <DropDown title="Access Restriction"></DropDown>
              </div>
              <div className="col-4">
                <DropDown title="Waitlist Email Interval"></DropDown>
              </div>
            </div>
            <div className="flex  justify-content-between ">
              <div className="col-4">
                <DropDown title="Club Account Payment Methods"></DropDown>
              </div>
            </div>
          </div>
        </CardWithTitle>
        <div className="mt-3">
          <CardWithTitle title="Address">
            <div className="p-3">
              <div className="flex justify-content-between ">
                <div className="col-4">
                  <DropDown title="Country"></DropDown>
                </div>
                <div className="col-4">
                  <Input title="Address 1"></Input>
                </div>
                <div className="col-4">
                  <Input title="Address 2"></Input>
                </div>
              </div>
              <div className="flex  justify-content-between ">
                <div className="col-4">
                  <Input title="City"></Input>
                </div>
                <div className="col-4">
                  <DropDown title="State"></DropDown>
                </div>
                <div className="col-4">
                  <Input title="Zip Code"></Input>
                </div>
              </div>
              <div>
                <span className="mt-3 text-semibold">Country Addresses</span>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Contact Information">
            <div className="p-3">
              <div className="flex justify-content-between ">
                <div className="col-4">
                  <Input title="Work Number"></Input>
                </div>
                <div className="col-4">
                  <Input title="Work Extention"></Input>
                </div>
                <div className="col-4">
                  <Input title="Fax Number"></Input>
                </div>
              </div>
              <div className="flex  justify-content-between ">
                <div className="col-4">
                  <Input title="Primary Email"></Input>
                </div>
                <div className="col-4">
                  <Input title="Alternate Email"></Input>
                </div>
                <div className="col-4">
                  <Input title="Work Extention"></Input>
                </div>
              </div>
              <div className="flex  justify-content-between ">
                <div className="col-4">
                  <Input title="Fax Number"></Input>
                </div>
                <div className="col-4">
                  <Input title="Primary Email"></Input>
                </div>
                <div className="col-4">
                  <Input title="Alternate Email"></Input>
                </div>
              </div>
              <div className="flex  justify-content-between ">
                <div className="col-4">
                  <Input title="Company URL"></Input>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Data Export">
            <div className="p-3">
              <div className="flex">
                <div className="col-4">
                  <Input title="Company Code"></Input>
                </div>
                <div className="col-4">
                  <Input title="Batch Id"></Input>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Remote Check Ins">
            <div className="p-3">
              <div className="flex justify-content-between ">
                <div className="col-4">
                  <DropDown title="Check In Limit"></DropDown>
                </div>
                <div className="col-4">
                  <DropDown title="Per"></DropDown>
                </div>
                <div className="col-4">
                  <DropDown title="Restriction Type"></DropDown>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Club Credit">
            <div className="p-3">
              <div className="flex  ">
                <div className="col-4">
                  <Input title="Club Credit Reset Day"></Input>
                </div>
                <div className="col-4">
                  <Input title="Allow Secondary Members"></Input>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="col-12 flex justify-content-end">
          <div className="col-1">
            <Buttons label="Save" className="btn-dark border-none "></Buttons>
          </div>
          <div className="col-1">
            <Buttons label="Cancel" className="btn-grey border-none "></Buttons>
          </div>
        </div>
        <div>
          <RecentCheckIn data={checkInData}></RecentCheckIn>
        </div>
      </div>
    </>
  );
};
