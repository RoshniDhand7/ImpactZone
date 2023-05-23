import React, { useState } from "react";
import CardWithTitle from "../../../../components/cards/cardWithTitle/cardWithTitle";
import { TabView, TabPanel } from "primereact/tabview";
import { Link } from "react-router-dom";
import { General } from "./general";
import { Online } from "./online";

const Company = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="General">
            <General></General>
          </TabPanel>
          <TabPanel header="online">
            <Online></Online>
          </TabPanel>
        </TabView>
      </div>
    </>
  );
};

export default Company;
