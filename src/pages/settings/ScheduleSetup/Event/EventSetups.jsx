import { TabPanel, TabView } from "primereact/tabview";
import React, { useState } from "react";
import EventGeneral from "./EventGeneral";
import DisplayOptions from "./displayOptions";
import EventOnline from "./EventOnline";
import EventNotifications from "./EventNotification";
import EventServices from "./EventServices";
import { showAllFormErrors } from "../../../../utils/commonFunctions";
import { useDispatch } from "react-redux";
import { showToast } from "../../../../redux/actions/toastAction";

const EventSetup = ({addEventData,handleChange,serviceSelectHandle,setLevelIndex,serviceHandleChange,serviceAddRow,selectedRow,isActiveHandle,submit,setIndexFunc,serviceIndex,serviceDetailIndex,deployhandle,clubSource,DeleteService,changePosition,DeleteAllService,setAddEventData,required,activeIndex,setActiveIndex,initialData}) => {
  // const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch()
  return (
    <>
      <div>
        <div className="">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => {if(showAllFormErrors(addEventData, setAddEventData,required,initialData)==true){
              setActiveIndex(e.index)
            }else{
              dispatch(showToast({ severity: "error", summary: "Please Fill All Required Fields" }));
            }
          }}
          >
            <TabPanel header="General">
              <EventGeneral addEventData={addEventData} handleChange={handleChange} setActiveIndex={setActiveIndex} isActiveHandle={isActiveHandle} setAddEventData={setAddEventData} required={required} initialData={initialData}/>
            </TabPanel>
            <TabPanel header="Services">
              <EventServices addEventData={addEventData} handleChange={handleChange} serviceSelectHandle={serviceSelectHandle} setLevelIndex={setLevelIndex} serviceHandleChange={serviceHandleChange} serviceAddRow={serviceAddRow} selectedRow={selectedRow} setActiveIndex={setActiveIndex} setIndexFunc={setIndexFunc} serviceIndex={serviceIndex} serviceDetailIndex={serviceDetailIndex} DeleteService={DeleteService} changePosition={changePosition} DeleteAllService={DeleteAllService} setAddEventData={setAddEventData} required={required} initialData={initialData}/>
            </TabPanel>
            <TabPanel header="Display Options">
              <DisplayOptions addEventData={addEventData} handleChange={handleChange} setActiveIndex={setActiveIndex} deployhandle={deployhandle} clubSource={clubSource} setAddEventData={setAddEventData} required={required} initialData={initialData}/>
            </TabPanel>
            <TabPanel header="Online">
              <EventOnline addEventData={addEventData} handleChange={handleChange} setActiveIndex={setActiveIndex} initialData={initialData}/>
            </TabPanel>
            <TabPanel header="Notifications">
              <EventNotifications addEventData={addEventData} handleChange={handleChange} setActiveIndex={setActiveIndex} submit={submit}/>
            </TabPanel>
          </TabView>
        </div>
      </div>
    </>
  );
};

export default EventSetup;
