import React from "react";
import { TabPanel, TabView } from "primereact/tabview";
import { useState } from "react";
import AddAccessSchedules from "./AddAccessSchedules";
import Access from "./Access";
import AccessSchedulesContainer from "./AccessSchedulesContainer";

const TabsAccessSchedules = ({
  showcomponent,
  handleAccessSchedulesChange,
  accessSchedulesForm,
  setAccessSchedulesForm,
  durations,
  onDurationChange,
  duration,
  onClickAllAccess,
  submit,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className="my-3 p-0">
        <div className="">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel header="General">
              <AddAccessSchedules
                showcomponent={showcomponent}
                accessSchedulesForm={accessSchedulesForm}
                handleAccessSchedulesChange={handleAccessSchedulesChange}
                submit={submit}
              />
            </TabPanel>
            <TabPanel header="Access">
              <Access
                accessSchedulesForm={accessSchedulesForm}
                setAccessSchedulesForm={setAccessSchedulesForm}
                handleAccessSchedulesChange={handleAccessSchedulesChange}
                durations={durations}
                duration={duration}
                showcomponent={showcomponent}
                onDurationChange={onDurationChange}
                onClickAllAccess={onClickAllAccess}
                submit={submit}
              />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </>
  );
};

export default TabsAccessSchedules;
