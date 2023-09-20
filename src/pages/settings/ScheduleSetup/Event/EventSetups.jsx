import { TabPanel, TabView } from "primereact/tabview";
import React, { useState } from "react";
import EventGeneral from "./EventGeneral";
import DisplayOptions from "./displayOptions";
import EventOnline from "./EventOnline";
import EventNotifications from "./EventNotification";
import EventServices from "./EventServices";

const EventSetup = ({addEventData,handleChange,serviceSelectHandle,setLevelIndex,serviceHandleChange,serviceAddRow,selectedRow,isActiveHandle,submit,setIndexFunc,serviceIndex,serviceDetailIndex,deployhandle,clubSource,DeleteService,changePosition}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div>
        <div className="">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel header="General">
              <EventGeneral addEventData={addEventData} handleChange={handleChange} setActiveIndex={setActiveIndex} isActiveHandle={isActiveHandle}/>
            </TabPanel>
            <TabPanel header="Services">
              <EventServices addEventData={addEventData} handleChange={handleChange} serviceSelectHandle={serviceSelectHandle} setLevelIndex={setLevelIndex} serviceHandleChange={serviceHandleChange} serviceAddRow={serviceAddRow} selectedRow={selectedRow} setActiveIndex={setActiveIndex} setIndexFunc={setIndexFunc} serviceIndex={serviceIndex} serviceDetailIndex={serviceDetailIndex} DeleteService={DeleteService} changePosition={changePosition}/>
            </TabPanel>
            <TabPanel header="Display Options">
              <DisplayOptions addEventData={addEventData} handleChange={handleChange} setActiveIndex={setActiveIndex} deployhandle={deployhandle} clubSource={clubSource}/>
            </TabPanel>
            <TabPanel header="Online">
              <EventOnline addEventData={addEventData} handleChange={handleChange} setActiveIndex={setActiveIndex} />
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
