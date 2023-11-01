import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Type from "./Type";
import OnlineItems from "./OnlineItems";
import POS from "./POS";
import Status from "./Status";
import POSCategory from "./POSCategory";
const CatalogItem = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="pt-2">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="Type">
            <Type />
          </TabPanel>
          <TabPanel header="Online Item">
            <OnlineItems></OnlineItems>
          </TabPanel>
          <TabPanel header="POS">
            <POS></POS>
          </TabPanel>
          <TabPanel header="Status">
            <Status />
          </TabPanel>
          <TabPanel header="POS Category">
            <POSCategory></POSCategory>
          </TabPanel>
        </TabView>
      </div>
    </>
  );
};

export default CatalogItem;
