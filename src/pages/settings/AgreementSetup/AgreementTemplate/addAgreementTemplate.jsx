import { TabPanel, TabView } from "primereact/tabview";
import React from "react";
import { useState } from "react";
import General from "./General";
import Field from "./Field";
import PageSettings from "./PageSettings";

const AddAgreementTemplate = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <div className="grid ">
        <div className="custom-tabview col-3 gray95 p-3">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel header="General">
              <General />
            </TabPanel>
            <TabPanel header="Field">
              <Field />
            </TabPanel>
            <TabPanel header="Page Settings">
              <PageSettings />
            </TabPanel>
          </TabView>
        </div>
        <div className="col-9">
          <div className="p-3 px-4">
            <h3 className="text-900">Untitled Template</h3>
            <div className="shadow-template mt-3 p-5">
              <div className="flex flex-column justify-content-between align-items-center border-color-style p-5 py-8">
                <h1 className="font-medium opacity-50 text-900 gray95 p-3 px-5 border-round-lg ">
                  LOGO
                </h1>
                <h2 className="my-3 text-900">
                  It’s time to design your Contract.
                </h2>
                <p className="opacity-50 text-sm text-center">
                  Now that you’ve selected a template, you’ll define the layout
                  of your email and give your content a place to live by
                  affing,rearraning, and deleting content blocks. <br />
                  <br /> when you’re ready to change the look of your email,
                  take a look through the “design” tab to set background colors,
                  borders, and other styles. <br />
                  <br className="line-3" />
                  If you need a bit of inspiration, you can
                  <small className="">
                    see what other Impact Zone, users are doing,
                  </small>
                  or learn about email design and blaze your own trail.
                </p>
              </div>
              <div className="flex justify-content-center align-items-center border-bottom-1 border-gray-100 py-6">
                <i className="pi pi-twitter"></i>
                <i className="pi pi-facebook mx-4"></i>
                <i className="pi pi-instagram"></i>
              </div>
              <div className="text-sm text-900 opacity-50 my-4 text-center flex justify-content-center py-3">
                Copyright© “| CURRENT_YEAR|* *|LIT:COMPANY|*, All rights
                reserved. <br />
                <br /> *|IFNOT:ARCHIEVE_PAGE|* *|LIST:DESCRIPTION|*
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAgreementTemplate;
