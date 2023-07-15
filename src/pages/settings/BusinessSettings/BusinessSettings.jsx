import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import ReasonCode from "./reason Code/reasonCode";
import CancelCode from "./cancelCode/cancelCode";
import Customization from "./customization/customization";
import Clubs from "./Clubs";
import JobTitle from "./JobTitle";
import CompanyDetails from "./company/companyDetails";

const BusinessSettings = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="p-3 mx-3">
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="Company">
            <CompanyDetails />
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
          <TabPanel header="Clubs">
            <Clubs></Clubs>
          </TabPanel>
          <TabPanel header="Job Title">
            <JobTitle></JobTitle>
          </TabPanel>
        </TabView>
      </div>
      <div></div>
    </>
  );
};

export default BusinessSettings;
