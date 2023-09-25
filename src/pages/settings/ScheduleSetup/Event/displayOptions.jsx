import React from "react";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import itemsbackword from "../../../../assets/icons/itemsbackward.png";
import { PickList } from "primereact/picklist";
import Input from "../../../../components/input/input";
import Buttons from "../../../../components/buttons/button";
import DropDown from "../../../../components/dropdown/dropdown";
import { useSelector } from "react-redux";
import { showAllFormErrors } from "../../../../utils/commonFunctions";

const DisplayOptions = ({
  addEventData,
  handleChange,
  setActiveIndex,
  deployhandle,
  clubSource,
  setAddEventData,
  required,
  initialData,
}) => {
  const calendarOptions = useSelector(
    (state) => state.staticData.calendarDisplay
  );
  const calendarPopOptions = useSelector(
    (state) => state.staticData.popupDisplay
  );
  // const deployedOptions = useSelector((state)=>state.staticData.deployedClubs)
  const reebokOptions = useSelector(
    (state) => state.staticData.rebookingTimeOption
  );
  // const allClubs = useSelector((state)=>state.clubs.clubs)
  //   console.log("clubs",allClubs)
  console.log("display", calendarOptions);

  const itemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex flex-column gap-2">
          <span>{item}</span>
        </div>
      </div>
    );
  };

  const DeployeitemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex flex-column gap-2">
          <span>{item.name}</span>
        </div>
      </div>
    );
  };

  const nextFunc = () => {
    console.log(
      "testinggg",
      showAllFormErrors(addEventData, setAddEventData, required, initialData)
    );
    if (
      showAllFormErrors(addEventData, setAddEventData, required, initialData) ==
      true
    ) {
      setActiveIndex(3);
    }
  };

  const backFunc = () => {
    setAddEventData((prev) => {
      return {
        ...prev,
        formErrors: {},
      };
    });
    setActiveIndex(1);
  };

  return (
    <>
      <div>
        <div className="my-3">
          {" "}
          <p className="text-xl font-semibold text-900 my-3 ">
            Add Event Setups
          </p>
        </div>
        <div>
          <CardWithTitle title="Calendar Display">
            <div className="p-3">
              <div className="card mt-3  ">
                <PickList
                  source={calendarOptions}
                  target={addEventData.calendarDisplay}
                  onChange={(event) =>
                    handleChange(event, "calendarDisplay|picker")
                  }
                  itemTemplate={itemTemplate}
                  name="calendarDisplay|picker"
                  breakpoint=""
                  sourceHeader="Available"
                  targetHeader="Selected"
                  sourceStyle={{ height: "30rem" }}
                  targetStyle={{ height: "30rem" }}
                />
                <div className="text-danger" style={{ color: "red" }}>
                  {addEventData?.formErrors?.calendarDisplay}
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="PopUp Display">
            <div className="p-3">
              <div className="card mt-3  ">
                <PickList
                  source={calendarPopOptions}
                  target={addEventData.popupDisplay}
                  onChange={(event) =>
                    handleChange(event, "popupDisplay|picker")
                  }
                  itemTemplate={itemTemplate}
                  name="popupDisplay|picker"
                  breakpoint=""
                  sourceHeader="Available"
                  targetHeader="Selected"
                  sourceStyle={{ height: "30rem" }}
                  targetStyle={{ height: "30rem" }}
                />
                <div className="text-danger" style={{ color: "red" }}>
                  {addEventData?.formErrors?.popupDisplay}
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Pending Color">
            <div className="p-3 flex justify-content-between align-items-center w-5 ">
              <div className="flex  align-items-center ">
                <div className="mr-4">
                  <Input
                    value={addEventData.pendingColor.boxColor}
                    onChange={handleChange}
                    name="boxColor|pendingColor"
                    title="Select Box Color"
                    type="color"
                    placeholder="color"
                    state={addEventData}
                    childState={true}
                  ></Input>
                </div>
                <div className=" ml-4">
                  {/* <Input
                  value={addEventData.pendingColor.textColor} 
                  onChange={handleChange} 
                  name="textColor|pendingColor"
                    title="Select Text Color"
                    placeholder="#fffff"
                    className="border-none "
                  ></Input> */}
                  <Input
                    value={addEventData.pendingColor.textColor}
                    onChange={handleChange}
                    name="textColor|pendingColor"
                    title="Select Text Color"
                    type="color"
                    placeholder="#fffff"
                    state={addEventData}
                    childState={true}
                  ></Input>
                </div>
              </div>
              <div>
                {/* <div className="mt-4">
                  <Buttons
                    label="Preview"
                    className="btn-dark border-none"
                    style={{ height: "39px" }}
                  ></Buttons>
                </div> */}
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Display Preview">
            <div className="p-3">
              <div
                style={
                  addEventData.pendingColor.boxColor
                    ? { backgroundColor: addEventData.pendingColor.boxColor }
                    : { backgroundColor: "#666666" }
                }
                className="p-3 text-white border-round-md border-none"
              >
                <p
                  className="text-xs"
                  style={
                    addEventData.pendingColor.textColor
                      ? { color: addEventData.pendingColor.textColor }
                      : { color: "#fff" }
                  }
                >
                  John Smith, Aga Group 60 Min, Status Pending, Employee Paul
                  Jones, 15/20
                </p>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Rebooking Time Option">
            <div className="p-3 flex justify-content-between align-items-center w-5 ">
              <div className="flex  align-items-center ">
                <div className="mr-4 col-12">
                  <DropDown
                    value={addEventData.rebookingTimeOption}
                    options={reebokOptions}
                    optionLabel="label"
                    onChange={handleChange}
                    name="rebookingTimeOption"
                    title="Times Shown"
                    placeholder="Quarter Hour"
                    state={addEventData}
                  ></DropDown>
                </div>
              </div>
              <div
                className="p-2 bg-white border-round-md text-sm flex justify-content-center align-items-center  mx-3 mt-4 "
                style={{ height: "38px" }}
              >
                <p className="mx-3 "> Preview: </p>
                {addEventData.rebookingTimeOption === "Hour" ? (
                  <>
                    <p className="text-blue mx-3 flex ">1:00 PM</p>
                    <p className="text-blue mx-3">2:00 PM</p>
                    <p className="text-blue mx-3 ">3:00 PM</p>
                    <p className="text-blue mx-3 ">4:00 PM</p>
                  </>
                ) : addEventData.rebookingTimeOption === "Half Hour" ? (
                  <>
                    <p className="text-blue mx-3 flex ">1:00 PM</p>
                    <p className="text-blue mx-3">1:30 PM</p>
                    <p className="text-blue mx-3 ">2:00 PM</p>
                    <p className="text-blue mx-3 ">2:30 PM</p>
                  </>
                ) : (
                  <>
                    <p className="text-blue mx-3 flex ">1:00 PM</p>
                    <p className="text-blue mx-3">1:15 PM</p>
                    <p className="text-blue mx-3 ">1:30 PM</p>
                    <p className="text-blue mx-3 ">1:45 PM</p>
                  </>
                )}
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Deployed Clubs">
            <div className="p-3">
              <div className="card mt-3  ">
                <PickList
                  source={clubSource}
                  target={addEventData.deployedClubPickerOption}
                  onChange={(event) =>
                    deployhandle(event, "deployedClubs|picker")
                  }
                  name="deployedClubs|picker"
                  itemTemplate={DeployeitemTemplate}
                  breakpoint=""
                  sourceHeader="Available"
                  targetHeader="Selected"
                  sourceStyle={{ height: "30rem" }}
                  targetStyle={{ height: "30rem" }}
                />
                <div className="text-danger" style={{ color: "red" }}>
                  {addEventData?.formErrors?.deployedClubs}
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
      </div>
      <div className=" m-2 mt-3 flex justify-content-end">
        <div className="mx-3">
          <Buttons
            label="Next"
            className="btn-dark   border-none"
            onClick={() => nextFunc()}
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

export default DisplayOptions;
