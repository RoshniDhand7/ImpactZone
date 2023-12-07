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
import Variations from "./Variations";
import TableData from "../../../../../components/cards/dataTable/dataTable";
import Buttons from "../../../../../components/buttons/button";
import Input from "../../../../../components/input/input";
import DropDown from "../../../../../components/dropdown/dropdown";
import Overlay from "../../../../../components/overlay/overlay";

const CatalogItem = () => {
  const [showtab, setShowtab] = useState();
  const [activeIndex, setActiveIndex] = useState(0);

  const openaddcatalogtab = () => {
    setShowtab((prev) => !prev);
  };
  const actionTemplate = (col) => {
    // console.log(col._id, "collllll");
    return (
      <>
        <div className="flex justify-content-end">
          <span>
            <i className="pi pi-pencil mr-3 cursor-pointer"></i>
          </span>
          <span>
            <i className="pi pi-trash cursor-pointer"></i>
          </span>
        </div>
      </>
    );
  };

  const AddEvent = (col) => {
    // console.log(col._id, "collllll");
    return (
      <>
        <div className="flex justify-content-end">
          <Buttons
            label="Add Event"
            icon="pi pi-plus-circle"
            className="bg-transparent text-blue-900 border-1 border-blue-900"
          ></Buttons>
        </div>
      </>
    );
  };

  const ManagePaymentPlansColumn = [
    {
      field: "",
      header: "",
      id: "",
      index: "",
    },
    {
      field: "ItemName",
      header: "Item Name",
      id: "",
      index: "",
    },
    {
      field: "ItemUPC",
      header: "Item UPC",
      id: "",
      index: "",
      sorting: true,
    },
    {
      field: "Price",
      header: "Price",
      id: "",
      index: "",
      sorting: true,
    },
    {
      field: "Event",
      header: "Event",
      id: "",
      index: "",
      sorting: true,
    },

    {
      field: "",
      header: "",
      id: "",
      body: AddEvent,
    },
    {
      field: "",
      header: "",
      id: "",
      body: actionTemplate,
    },
  ];

  const [ManagePaymentPlansData, setManagePaymentPlansData] = useState([
    {
      ItemName: "Annual Fee",
      ItemUPC: "Annual Fee",
      Price: "$49.99",
      Event: "01/03/2022",
    },
    {
      ItemName: "Late Fee",
      ItemUPC: "-",
      Price: "$49.99",
      Event: "01/03/2022",
    },
    {
      ItemName: "Decline Fee",
      ItemUPC: "-",
      Price: "$49.99",
      Event: "01/03/2022",
    },
    {
      ItemName: "No Show Fee",
      ItemUPC: "GymAccess",
      Price: "$49.99",
      Event: "01/03/2022",
    },
    {
      ItemName: "Freeze Fee",
      ItemUPC: "Unassigned",
      Price: "$49.99",
      Event: "01/03/2022",
    },
  ]);
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
            <TabPanel header="Variations">
              <Variations />
            </TabPanel>
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
        <div>
          <div className="flex justify-content-between align-items-center pr-2 mt-3">
            <div className="col-6  p-0 px-0 flex justify-content-start mx-0">
              <div className="col-6 p-0">
                <DropDown
                  title="Product Type"
                  label="Product"
                  className=" bg-white border-none text-900 shadow-1"
                ></DropDown>
              </div>
              <div className="mx-3 col-6 p-0">
                <Overlay label="Advance Filters" style={{ width: "450px" }}>
                  <div className="flex justify-content-between">
                    <div className="col-6">
                      <DropDown title={"Profit Center"}></DropDown>
                      <DropDown title={"Online Status"}></DropDown>
                      <DropDown title={"Sale Item"}></DropDown>
                      <DropDown title={"Commission Item"}></DropDown>
                      <DropDown title={"Pays for Events"}></DropDown>
                      <DropDown title={"Created Date"}></DropDown>
                    </div>
                    <div className="col-6">
                      <DropDown title={"Item Status"}></DropDown>
                      <DropDown title={"Club"}></DropDown>
                      <DropDown title={"POS Category"}></DropDown>
                      <DropDown title={"Discounts Items"}></DropDown>
                      <DropDown title={"Created By"}></DropDown>
                      <DropDown title={"Price Range"}></DropDown>
                    </div>
                  </div>
                  <div className="flex justify-content-end px-3">
                    <div className="mx-3">
                      <Buttons label="Apply" className={"btn-dark"}></Buttons>
                    </div>
                    <Buttons label="Clear" className={"btn-grey"}></Buttons>
                  </div>
                </Overlay>
              </div>
            </div>
            <div className="col-6 p-0 flex justify-content-end align-items-center ">
              <div>
                <Input
                  type="search"
                  icon="pi pi-search"
                  placeholder="search"
                ></Input>
              </div>

              <div className="mx-2 mt-2">
                <Buttons
                  onClick={() => openaddcatalogtab()}
                  style={{ height: "38px" }}
                  label="Add Catalog Item"
                  icon="pi pi-plus-circle"
                  className="btn-dark"
                ></Buttons>
              </div>
            </div>
          </div>
          <div className="">
            <div className="mt-2 relative">
              <TableData
                columns={ManagePaymentPlansColumn}
                data={ManagePaymentPlansData}
                selectionMode={"checkbox"}
              />
              <div className="absolute top-0 right-0 margin">
                <Buttons
                  style={{ height: "39px" }}
                  label="Deploy Selected Items"
                  className="bg-transparent mt-1 border-white border-1 "
                  icon="pi pi-sort-alt"
                  iconPos="right"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CatalogItem;
