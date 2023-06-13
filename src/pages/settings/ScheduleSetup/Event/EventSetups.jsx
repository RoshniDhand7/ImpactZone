import { TabPanel, TabView } from "primereact/tabview";
import React, { useState } from "react";
import EventGeneral from "./EventGeneral";
import DisplayOptions from "./displayOptions";

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
            <TabPanel header="Services"></TabPanel>
            <TabPanel header="Display Options">
              <DisplayOptions />
            </TabPanel>
            <TabPanel header="Online"></TabPanel>
            <TabPanel header="Notifications"></TabPanel>
          </TabView>
        </div>
      </div>
    </>
  );
};

export default EventSetup;
