import React from "react";
import Checkbox from "../../../../components/checkbox/checkbox";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../components/input/input";
import DropDown from "../../../../components/dropdown/dropdown";
import { PickList } from "primereact/picklist";
import itemsbackword from "../../../../assets/icons/itembackward.png";
import Buttons from "../../../../components/buttons/button";
import { useSelector } from "react-redux";
import { showAllFormErrors } from "../../../../utils/commonFunctions";

const EventGeneral = ({addEventData,handleChange,setActiveIndex,isActiveHandle,setAddEventData,required,initialData}) => {
  const EventOptions = useSelector((state)=>state.staticData.EventType)
  const choiceTypeOptions = useSelector((state)=>state.staticData.choiceType)
  const NumberchoiceTypeOption = useSelector((state)=>state.staticData.NumberchoiceType)
  const EventComissionTypeOption = useSelector((state)=>state.staticData.EventComissionType)
  const locationTypeOptions = useSelector((state)=>state.locations.locationTypes)
  const WaitExpireTypeOption = useSelector((state)=>state.staticData.WaitExpireType)
  const durationOptions = useSelector((state)=>state.staticData.duration)
  console.log("durationOptions",durationOptions)
  let lessThanOption = []
  for (let i = 0; i <= 30; i++) {
   let obj = {label:`${i}`,value:i}
   lessThanOption.push(obj)
  }
  const itemTemplate = (item) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3">
        <div className="flex-1 flex flex-column gap-2">
          <span className="">{item} minutes</span>
        </div>
      </div>
    );
  };

  const nextFunc = () => {
    console.log("testinggg",showAllFormErrors(addEventData, setAddEventData,required,initialData))
    if(showAllFormErrors(addEventData, setAddEventData,required,initialData)==true){
      setActiveIndex(1)
    }
  }
  

  return (
    <>
      <div className="">
        <div className="my-3">
          <span className="text-xl font-bold text-900 ">Add Event Setups</span>
        </div>
        <div className=" font-semibold text-sm text-900 ">
          <Checkbox title="Active" value={addEventData.isActive} name="isActive" onChange={isActiveHandle}></Checkbox>
        </div>
        <div className="mt-3">
          <CardWithTitle title="General">
            <div className="p-3 ">
              <div className="flex justify-content-between ">
                <div className="col">
                  <Input title="Name" value={addEventData.name} onChange={handleChange} name="name" state={addEventData}></Input>
                </div>
                <div className="col">
                  <DropDown title="Event Type" value={addEventData.type} options={EventOptions} optionLabel="label" onChange={handleChange} name="type" state={addEventData}></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Internal Use" value={addEventData.internalUse} options={choiceTypeOptions} optionLabel="label" onChange={handleChange} name="internalUse" state={addEventData}></DropDown>
                </div>
              </div>
              <div className="flex justify-content-between mt-3 ">
                <div className="col">
                  <DropDown title="Location Type" options={locationTypeOptions} value={addEventData.locationType} optionLabel="name" onChange={handleChange} name="locationType" state={addEventData}></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Default Max Attendees" value={addEventData.defaulatMaxAttendees} options={lessThanOption} optionLabel="label" onChange={handleChange} name="defaulatMaxAttendees" state={addEventData}></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Event Commission Type" value={addEventData.eventCommType} options={EventComissionTypeOption} optionLabel="label" onChange={handleChange} name="eventCommType" state={addEventData}></DropDown>
                </div>
              </div>
              <div className="flex justify-content-between mt-3 ">
                <div className="col">
                  <DropDown title="Available Online" value={addEventData.availableOnline} options={choiceTypeOptions} optionLabel="label" onChange={handleChange} name="availableOnline" state={addEventData}></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Track Attendees" value={addEventData.trackAttendees} options={choiceTypeOptions} optionLabel="label" onChange={handleChange} name="trackAttendees" state={addEventData}></DropDown>
                </div>
                <div className="col">
                  <DropDown
                    title="Maximum Waitlist (Turned off at club level)"
                    value={addEventData.maxWaitList}
                    options={lessThanOption} optionLabel="label"
                    disabled
                    onChange={handleChange}
                    name="maxWaitList"
                    state={addEventData}
                  ></DropDown>
                </div>
              </div>
              <div className="flex justify-content-between mt-3 ">
                <div className="col-4">
                  <DropDown title="Waitlist Expiration (Turned off at club level)" value={addEventData.waitListExpiration} options={WaitExpireTypeOption} optionLabel="label" onChange={handleChange} name="waitListExpiration" state={addEventData}></DropDown>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Required To Create">
            <div className="p-3 flex">
              <div className="col">
                <DropDown title="Employee" name="employee|requiredToCreate" value={addEventData.requiredToCreate.employee} options={choiceTypeOptions} optionLabel="label" onChange={handleChange} state={addEventData} childState={true}></DropDown>
              </div>
              <div className="col">
                <DropDown title="Location" name="location|requiredToCreate" value={addEventData.requiredToCreate.location} options={choiceTypeOptions} optionLabel="label" onChange={handleChange} state={addEventData} childState={true}></DropDown>
              </div>
              <div className="col">
                <DropDown title="Member" name="member|requiredToCreate" value={addEventData.requiredToCreate.member} options={choiceTypeOptions} optionLabel="label" onChange={handleChange} state={addEventData} childState={true}></DropDown>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Required To Complete">
            <div className="p-3">
              <div className="flex justify-content-between ">
                <div className="col">
                  <DropDown title="Employee" name="employee|requiredToComplete" value={addEventData.requiredToComplete.employee} options={choiceTypeOptions} optionLabel="label" onChange={handleChange} state={addEventData} childState={true}></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Location" name="location|requiredToComplete" value={addEventData.requiredToComplete.location} options={choiceTypeOptions} optionLabel="label" onChange={handleChange} state={addEventData} childState={true}></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Member" name="member|requiredToComplete" value={addEventData.requiredToComplete.member} options={choiceTypeOptions} optionLabel="label" onChange={handleChange} state={addEventData} childState={true}></DropDown>
                </div>
              </div>
              <div className="flex justify-content-between mt-3 ">
                <div className="col">
                  <DropDown title="Member Verification" name="memberVerification|requiredToComplete" value={addEventData.requiredToComplete.memberVerification} options={choiceTypeOptions} optionLabel="label" onChange={handleChange} state={addEventData} childState={true}></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Employee Verification (Turned off at club level)" name="employeeVerification|requiredToComplete" value={addEventData.requiredToComplete.employeeVerification} options={choiceTypeOptions} optionLabel="label" onChange={handleChange} state={addEventData} childState={true}></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Auto Complete" name="autoComplete|requiredToComplete" value={addEventData.requiredToComplete.autoComplete} options={choiceTypeOptions} optionLabel="label" onChange={handleChange} state={addEventData} childState={true}></DropDown>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Booking & Cancellation">
            <div className="p-3">
              <div className="flex justify-content-between ">
                <div className="col">
                  <DropDown title="Overbooking" name="overBooking|bookingAndCancellation" value={addEventData.bookingAndCancellation.overBooking} options={choiceTypeOptions} optionLabel="label" onChange={handleChange} state={addEventData} childState={true}></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Cancel-NC" name="cancelNoCharge|bookingAndCancellation" value={addEventData.bookingAndCancellation.cancelNoCharge} options={choiceTypeOptions} optionLabel="label" onChange={handleChange} state={addEventData} childState={true}></DropDown>
                </div>
                <div className="col">
                  <DropDown title="Cancel-C" name="cancelCharge|bookingAndCancellation" value={addEventData.bookingAndCancellation.cancelCharge} options={choiceTypeOptions} optionLabel="label" onChange={handleChange} state={addEventData} childState={true}></DropDown>
                </div>
              </div>
              <div className="flex justify-content-between mt-3 ">
                <div className="col-4">
                  <DropDown title="Rebook" name="rebook|bookingAndCancellation" value={addEventData.bookingAndCancellation.rebook} options={choiceTypeOptions} optionLabel="label" onChange={handleChange} state={addEventData} childState={true}></DropDown>
                </div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className="mt-3">
          <CardWithTitle title="Durations">
            <div className="p-3 px-4 ">
              <div className="info-box  flex p-3 mb-2">
                <i
                  className="pi pi-info-circle"
                  style={{ color: " #329bea", width: "15px", height: "15px" }}
                ></i>
                <p className="info-color mx-3 ">
                  To top duration will be the default when creating events.
                </p>
              </div>
              <div className="card mt-4  ">
                <PickList
                  source={durationOptions}
                  target={addEventData.durations}
                  onChange={(event)=>handleChange(event,"durations|picker")}
                  itemTemplate={itemTemplate}
                  name="durations|picker"
                  breakpoint=""
                  sourceHeader="Available"
                  targetHeader="Selected"
                  sourceStyle={{ height: "30rem" }}
                  targetStyle={{ height: "30rem" }}
                />
                <div className="text-danger" style={{color:"red"}}>{addEventData?.formErrors?.durations}</div>
              </div>
            </div>
          </CardWithTitle>
        </div>
        <div className=" m-2 mt-3 flex justify-content-end ">
          <div className="mx-4">
            <Buttons
              label="Next"
              onClick={()=> nextFunc()}
              className="btn-dark mx-3 border-none"
              
            ></Buttons>
          </div>
          <div className="">
            <Buttons
              label="Cancel"
              className="btn-grey   border-none"
            ></Buttons>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventGeneral;
