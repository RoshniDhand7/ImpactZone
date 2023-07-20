import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useState } from "react";
import ItemCommission from "./itemCommission";
import SalesBonus from "./salesBonus";

const SalesCommission = ({ setData, data, createEmployee }) => {
  const [activeIndex4, setActiveIndex4] = useState(0);
  return (
    <>
      <div className="">
        <TabView
          activeIndex={activeIndex4}
          onTabChange={(e) => setActiveIndex4(e.index)}
        >
          <TabPanel header="Item Commission">
            <ItemCommission
              setData={setData}
              data={data}
              createEmployee={createEmployee}
            />
          </TabPanel>
          <TabPanel header="Bonus">
            <SalesBonus
              setData={setData}
              data={data}
              createEmployee={createEmployee}
            />
          </TabPanel>
        </TabView>
      </div>
    </>
  );
};

export default SalesCommission;
