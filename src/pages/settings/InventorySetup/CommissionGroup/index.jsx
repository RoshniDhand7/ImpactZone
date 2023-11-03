import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import Products from "./Products";
import Services from "./Services";
import Agreement from "./Agreement";

const CommissionGroup = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="pt-2 relative">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="Products">
            <Products />
          </TabPanel>
          <TabPanel header="Services">
            <Services></Services>
          </TabPanel>
          <TabPanel header="Agreement">
            <Agreement></Agreement>
          </TabPanel>
        </TabView>
      </div>
    </>
  );
};

export default CommissionGroup;
