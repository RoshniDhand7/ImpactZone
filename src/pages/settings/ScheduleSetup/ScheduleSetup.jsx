import { TabPanel, TabView } from "primereact/tabview";
import React, { useState } from "react";
import ScheduleLevel from "./levelpages/ScheduleLevel";
import LocationTypes from "./locationTypes";
import Location from "./levelpages/Location";

const ScheduleSetup = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div>
      <div className="p-3">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="Level">
            <ScheduleLevel />
          </TabPanel>
          <TabPanel header="Location Type">
            <LocationTypes />
          </TabPanel>
          <TabPanel header="Location">
            <Location />
          </TabPanel>
          <TabPanel header="Event Setups"></TabPanel>
          <TabPanel header="Event Categories"></TabPanel>
          <TabPanel header="Classes"></TabPanel>
        </TabView>
      </div>
    </div>
  );
};

export default ScheduleSetup;
