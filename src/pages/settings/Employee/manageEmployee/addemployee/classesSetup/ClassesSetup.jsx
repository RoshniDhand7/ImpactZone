import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useState } from "react";
import Pay from "./pay";
import SubstituteOption from "./SubstituteOption";
const ClassesSetup = () => {
  const [activeIndex3, setActiveIndex3] = useState(0);
  return (
    <>
      <div>
        <div>
          <div className="">
            <TabView
              activeIndex={activeIndex3}
              onTabChange={(e) => setActiveIndex3(e.index)}
            >
              <TabPanel header="Pay">
                <Pay />
              </TabPanel>
              <TabPanel header="Substitute Option">
                <SubstituteOption />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassesSetup;
