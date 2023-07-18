import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { useState } from "react";
import Bonus from "./Bonus";
import CalendarDefacult from "./CalendarDefacult";
import AppointmentPay from "./AppointmentPay";

const AppointmentSetup = () => {
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
                <AppointmentPay />
              </TabPanel>
              <TabPanel header="Bonus">
                <Bonus />
              </TabPanel>
              <TabPanel header="Calendar Default">
                <CalendarDefacult />
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentSetup;
