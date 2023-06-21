import { TabPanel, TabView } from "primereact/tabview";
import React, { useState } from "react";
import EventGeneral from "./EventGeneral";
import DisplayOptions from "./displayOptions";
import EventOnline from "./EventOnline";
import EventNotifications from "./EventNotification";
import EventServices from "./EventServices";

const EventSetup = () => {
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
              <EventGeneral />
            </TabPanel>
            <TabPanel header="Services">
              <EventServices />
            </TabPanel>
            <TabPanel header="Display Options">
              <DisplayOptions />
            </TabPanel>
            <TabPanel header="Online">
              <EventOnline />
            </TabPanel>
            <TabPanel header="Notifications">
              <EventNotifications />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </>
  );
};

export default EventSetup;
