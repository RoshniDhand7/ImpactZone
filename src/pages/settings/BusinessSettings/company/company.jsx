import React, { useState } from "react";

import { TabView, TabPanel } from "primereact/tabview";

import { General } from "./general";
import { Online } from "./online";

const Company = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="my-2">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="General">
            <General></General>
          </TabPanel>
          <TabPanel header="Online">
            <Online></Online>
          </TabPanel>
        </TabView>
      </div>
    </>
  );
};

export default Company;
