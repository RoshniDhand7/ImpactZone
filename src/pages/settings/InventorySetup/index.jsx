import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import CatalogItem from "./CatalogItem";
import RecentCheckIn from "../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../utils/checkInData";
import ProfileTypes from "./ProfileCenter";
import Category from "./Categories";
import Vendors from "./Vendor";
import CommissionGroup from "./CommissionGroup";
import ReferralGroup from "./RefferalGroup";
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
          <TabPanel header="Categories">
            <Category />
          </TabPanel>
          <TabPanel header="Vendors">
            <Vendors />
          </TabPanel>
          <TabPanel header="Commission Group">
            <CommissionGroup />
          </TabPanel>
          <TabPanel header="Referral Group">
            <ReferralGroup />
          </TabPanel>
        </TabView>
        <div className="mt-8">
          <RecentCheckIn data={checkInData} />
        </div>
      </div>
    </>
  );
};

export default InventorySetup;
