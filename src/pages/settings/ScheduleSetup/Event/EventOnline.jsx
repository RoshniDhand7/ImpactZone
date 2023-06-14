import React from "react";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import DropDown from "../../../../components/dropdown/dropdown";
import Buttons from "../../../../components/buttons/button";

const EventOnline = () => {
  return (
    <>
      <div>
        <div className="my-3">
          <span className="font-semibold text-xl text-900 ">
            Add Event Setups
          </span>
        </div>
        <div className="">
          <CardWithTitle title="Allow Booking an Appointment">
            <div className="p-3 flex ">
              <div className="col-4">
                <DropDown
                  placeholder="24hours"
                  title="User can book an appointment that is at least"
                ></DropDown>
              </div>
              <div className="col-4">
                <DropDown
                  placeholder="14 days"
                  title="In the future and less than"
                ></DropDown>
              </div>
              <p className="text-sm text-gray-600 mt-5 mx-3 p-2 ">Out</p>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Cancellation">
            <div className="p-3 flex">
              <div className="col-4">
                <DropDown
                  placeholder="24hours"
                  title="Allow cancel online:"
                ></DropDown>
              </div>
              <div className="col-4">
                <DropDown
                  placeholder="14 days"
                  title="Time before event:"
                ></DropDown>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Description">
            <div className="p-4">
              <div
                style={{ height: "176px" }}
                className="bg-white border-round m-2"
              ></div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Terms and Conditions">
            <div className="p-4">
              <div
                style={{ height: "176px" }}
                className="bg-white border-round m-2"
              ></div>
            </div>
          </CardWithTitle>
        </div>
      </div>
      <div className=" m-2 mt-3 flex justify-content-end">
        <div className="mx-3">
          <Buttons label="Next" className="btn-dark   border-none"></Buttons>
        </div>
        <div className="">
          <Buttons label="Cancel" className="btn-grey   border-none"></Buttons>
        </div>
      </div>
    </>
  );
};

export default EventOnline;
