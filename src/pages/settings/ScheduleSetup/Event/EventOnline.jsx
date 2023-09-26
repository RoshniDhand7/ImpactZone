import React from "react";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import DropDown from "../../../../components/dropdown/dropdown";
import Buttons from "../../../../components/buttons/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useSelector } from "react-redux";

const EventOnline = ({
  addEventData,
  handleChange,
  setActiveIndex,
  initialData,
  setAddEventData,
}) => {
  const choiceTypeOptions = useSelector((state) => state.staticData.choiceType);
  let atLeastOption = [];
  for (let i = 0; i <= 24; i++) {
    let obj = { label: `${i} Hours`, value: `${i} Hours` };
    atLeastOption.push(obj);
  }

  let lessThanOption = [];
  for (let i = 0; i <= 30; i++) {
    let obj = { label: `${i} Days`, value: `${i} Days` };
    lessThanOption.push(obj);
  }

  const backFunc = () => {
    // setAddEventData((prev) => {
    //   return {
    //     ...prev,
    //     formErrors: {},
    //   };
    // });
    setActiveIndex(2);
  };

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
                  name="atLeast|allowBooking"
                  value={addEventData.allowBooking.atLeast}
                  options={atLeastOption}
                  optionLabel="label"
                  onChange={handleChange}
                  placeholder="24hours"
                  title="User can book an appointment that is at least"
                ></DropDown>
              </div>
              <div className="col-4">
                <DropDown
                  name="lessThan|allowBooking"
                  value={addEventData.allowBooking.lessThan}
                  options={lessThanOption}
                  optionLabel="label"
                  onChange={handleChange}
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
                  name="cancelOnline|bookingCancellation"
                  value={addEventData.bookingCancellation.cancelOnline}
                  options={choiceTypeOptions}
                  optionLabel="label"
                  onChange={handleChange}
                  placeholder=""
                  title="Allow cancel online:"
                ></DropDown>
              </div>
              <div className="col-4">
                <DropDown
                  name="timeBeforeEvent|bookingCancellation"
                  value={addEventData.bookingCancellation.timeBeforeEvent}
                  options={lessThanOption}
                  optionLabel="label"
                  onChange={handleChange}
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
              {/* <div
                style={{ height: "176px" }}
                className="bg-white border-round m-2"
              ></div> */}
              <InputTextarea
                value={addEventData.description}
                onChange={handleChange}
                name="description"
                style={{ width: "100%", height: "176px" }}
              />
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Terms and Conditions">
            <div className="p-4">
              {/* <div
                style={{ height: "176px" }}
                className="bg-white border-round m-2"
              ></div> */}
              <InputTextarea
                value={addEventData.termsAndConditions}
                onChange={handleChange}
                name="termsAndConditions"
                style={{ width: "100%", height: "176px" }}
              />
            </div>
          </CardWithTitle>
        </div>
      </div>
      <div className=" m-2 mt-3 flex justify-content-end">
        <div className="mx-3">
          <Buttons
            label="Next"
            className="btn-dark   border-none"
            onClick={() => setActiveIndex(4)}
          ></Buttons>
        </div>
        <div className="">
          <Buttons
            label="Cancel"
            className="btn-grey   border-none"
            onClick={() => backFunc()}
          ></Buttons>
        </div>
      </div>
    </>
  );
};

export default EventOnline;
