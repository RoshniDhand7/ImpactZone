import React from "react";
import { TabPanel, TabView } from "primereact/tabview";
import { useState } from "react";
import Campaigns from "./Campaigns/Campaigns";
import AccessSchedules from "./Access Schedules/AccessSchedules";
import ResourceType from "./ResourceType.jsx/ResourceType";
import Resource from "./Resource/Resource";
import ManageMembershipTypes from "./ManageMembershipType.jsx/manageMembershipTypes";


const MemberSetup = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <>
      <div className="my-2 mx-3">
        <div className="p-3">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel header="Manage Membership Types">
              <ManageMembershipTypes />
            </TabPanel>
            <TabPanel header="Campaigns">
              <Campaigns />
            </TabPanel>
            <TabPanel header="Access Schedules">
              <AccessSchedules />
            </TabPanel>
            <TabPanel header="Resource Type">
              <ResourceType />
            </TabPanel>
            <TabPanel header="Resource">
              <Resource />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </>
  );
};

export default MemberSetup;
