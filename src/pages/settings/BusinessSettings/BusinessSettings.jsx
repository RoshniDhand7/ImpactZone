import React, { useState } from "react";
import CardWithTitle from "../../../components/cards/cardWithTitle/cardWithTitle";
import { TabView, TabPanel } from "primereact/tabview";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import Company from "./company/company";
import ReasonCode from "./reason Code/reasonCode";
import CancelCode from "./cancelCode/cancelCode";
import Customization from "./customization/customization";

const BusinessSettings = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isactive, setIsActive] = useState(0);
  return (
    <>
      <div className="p-3">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="Company">
            <Company />
          </TabPanel>
          <TabPanel header="Reason Code">
            <ReasonCode />
          </TabPanel>
          <TabPanel header="Cancel Code">
            <CancelCode />
          </TabPanel>
          <TabPanel header="Customization">
            <Customization></Customization>
          </TabPanel>
        </TabView>
      </div>
      <div></div>
    </>
  );
};

export default BusinessSettings;
