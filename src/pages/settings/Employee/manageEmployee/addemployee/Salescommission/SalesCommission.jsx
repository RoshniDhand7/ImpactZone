import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useState } from "react";
import ItemCommission from "./itemCommission";
import SalesBonus from "./salesBonus";

const SalesCommission = () => {
  const [activeIndex4, setActiveIndex4] = useState(0);
  return (
    <>
      <div className="">
        <TabView
          activeIndex={activeIndex4}
          onTabChange={(e) => setActiveIndex4(e.index)}
        >
          <TabPanel header="ItemCommission">
            <ItemCommission />
          </TabPanel>
          <TabPanel header="Bonus">
            <SalesBonus />
          </TabPanel>
        </TabView>
      </div>
    </>
  );
};

export default SalesCommission;
