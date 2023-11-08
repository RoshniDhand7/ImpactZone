import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";

import OnlineItems from "../OnlineItems";
import POS from "../POS";
import Status from "../Status";
import POSCategory from "../POSCategory";
import Type from "../Type/Type";
import AddCatelogGeneral from "./AddCategoryGeneral";
import Tracking from "./Tracking";
import Usage from "./Usage";

const CatalogItem = () => {
  const [showtab, setShowtab] = useState();
  const [activeIndex, setActiveIndex] = useState(0);

  const openaddcatalogtab = () => {
    setShowtab((prev) => !prev);
  };
  const AddCatalogtab = () => {
    return (
      <>
        <div className="pt-2">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel header="General">
              <AddCatelogGeneral openaddcatalogtab={openaddcatalogtab} />
            </TabPanel>
            <TabPanel header="Tracking">
              <Tracking openaddcatalogtab={openaddcatalogtab}></Tracking>
            </TabPanel>
            <TabPanel header="Usage">
              <Usage openaddcatalogtab={openaddcatalogtab} />
            </TabPanel>
            <TabPanel header="Variations"></TabPanel>
          </TabView>
        </div>
      </>
    );
  };

  return (
    <>
      {showtab ? (
        AddCatalogtab()
      ) : (
        <div className="pt-2">
          <TabView
            activeIndex={activeIndex}
            onTabChange={(e) => setActiveIndex(e.index)}
          >
            <TabPanel header="Type">
              <Type openaddcatalogtab={openaddcatalogtab} />
            </TabPanel>
            <TabPanel header="Online Item">
              <OnlineItems openaddcatalogtab={openaddcatalogtab}></OnlineItems>
            </TabPanel>
            <TabPanel header="POS">
              <POS openaddcatalogtab={openaddcatalogtab}></POS>
            </TabPanel>
            <TabPanel header="Status">
              <Status openaddcatalogtab={openaddcatalogtab} />
            </TabPanel>
            <TabPanel header="POS Category">
              <POSCategory openaddcatalogtab={openaddcatalogtab}></POSCategory>
            </TabPanel>
          </TabView>
        </div>
      )}
    </>
  );
};

export default CatalogItem;
