import { TabPanel, TabView } from "primereact/tabview";
import React from "react";
import { useState } from "react";

const AddAgreementTemplate = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="grid ">
        <div className="custom-tabview col-4 gray95 p-3">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel header="General"></TabPanel>
            <TabPanel header="Field"></TabPanel>
            <TabPanel header="Page Settings"></TabPanel>
          </TabView>
        </div>
        <div className="col-8">hello</div>
      </div>
    </>
  );
};

export default AddAgreementTemplate;
