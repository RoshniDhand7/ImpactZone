import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useState } from "react";
import Pay from "./pay";
import SubstituteOption from "./SubstituteOption";

const ClassesSetup = ({ setData, data, createEmployee }) => {
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
                <Pay
                  setData={setData}
                  data={data}
                  createEmployee={createEmployee}
                />
              </TabPanel>
              <TabPanel header="Substitute Option">
                <SubstituteOption
                  setData={setData}
                  data={data}
                  createEmployee={createEmployee}
                />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassesSetup;
