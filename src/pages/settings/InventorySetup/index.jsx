import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import CatalogItem from "./CatalogItem";
import RecentCheckIn from "../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../utils/checkInData";
import ProfileTypes from "./ProfileCenter";
const InventorySetup = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="p-3 mx-3">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="Catalog Item">
            <CatalogItem />
          </TabPanel>
          <TabPanel header="Profit Center">
            <ProfileTypes></ProfileTypes>
          </TabPanel>
          <TabPanel header="Categories"></TabPanel>
          <TabPanel header="Vendors"></TabPanel>
          <TabPanel header="Commission Group"></TabPanel>
          <TabPanel header="Referral Group"></TabPanel>
        </TabView>
        <div className="mt-4">
          <RecentCheckIn data={checkInData} />
        </div>
      </div>
    </>
  );
};

export default InventorySetup;
