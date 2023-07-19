import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useState } from "react";
import Bonus from "./Bonus";
import CalendarDefacult from "./CalendarDefault";
import AppointmentPay from "./AppointmentPay";

const AppointmentSetup = ({ data, setData, createEmployee }) => {
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
                <AppointmentPay
                  setData={setData}
                  data={data}
                  createEmployee={createEmployee}
                />
              </TabPanel>
              <TabPanel header="Bonus">
                <Bonus
                  setData={setData}
                  data={data}
                  createEmployee={createEmployee}
                />
              </TabPanel>
              <TabPanel header="Calendar Default">
                <CalendarDefacult
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

export default AppointmentSetup;
