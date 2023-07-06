import { TabPanel, TabView } from "primereact/tabview";
import React, { useState } from "react";
import ScheduleLevel from "./levelpages/ScheduleLevel";
import LocationTypes from "./locationTypes";
import Location from "./Location";
import EventSetups from "./Event/Event";
import EventCategories from "./EventCategories";
import Classes from "./Classes";

const ScheduleSetup = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className="mx-3">
      <div className="p-3">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="Levels">
            <ScheduleLevel />
          </TabPanel>
          <TabPanel header="Location Types">
            <LocationTypes />
          </TabPanel>
          <TabPanel header="Locations">
            <Location />
          </TabPanel>
          <TabPanel header="Event Setups">
            <EventSetups />
          </TabPanel>
          <TabPanel header="Event Categories">
            <EventCategories />
          </TabPanel>
          <TabPanel header="Classes">
            <Classes></Classes>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default ScheduleSetup;
