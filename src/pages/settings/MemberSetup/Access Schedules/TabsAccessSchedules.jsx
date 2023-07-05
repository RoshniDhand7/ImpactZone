import React from "react";
import { TabPanel, TabView } from "primereact/tabview";
import { useState } from "react";
import AddAccessSchedules from "./AddAccessSchedules";
import Access from "./Access";

const TabsAccessSchedules = ({ showcomponent }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="my-3 p-0">
        <div className="">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel header="General">
              <AddAccessSchedules showcomponent={showcomponent} />
            </TabPanel>
            <TabPanel header="Access">
              <Access />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </>
  );
};

export default TabsAccessSchedules;
