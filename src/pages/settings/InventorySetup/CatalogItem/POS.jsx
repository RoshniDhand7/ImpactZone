import React from "react";
import Buttons from "../../../../components/buttons/button";
import Input from "../../../../components/input/input";
import TableData from "../../../../components/cards/dataTable/dataTable";
import { useState } from "react";

const POS = ({ openaddcatalogtab }) => {
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

  const POSPlansColumn = [
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
      field: "Plans",
      header: "Plans",
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
  const [POSPlansColumnData, setPOSPlansColumnData] = useState([
    {
      ItemName: "Annual Fee",
      ItemUPC: "Annual Fee",
      Price: "$49.99",
      Plans: "Premium",
    },
    {
      ItemName: "Late Fee",
      ItemUPC: "-",
      Price: "$49.99",
      Plans: "Premium",
    },
    {
      ItemName: "Decline Fee",
      ItemUPC: "-",
      Price: "$49.99",
      Plans: "Premium",
    },
    {
      ItemName: "No Show Fee",
      ItemUPC: "GymAccess",
      Price: "$49.99",
      Plans: "Premium",
    },
    {
      ItemName: "Freeze Fee",
      ItemUPC: "Unassigned",
      Price: "$49.99",
      Plans: "Premium",
    },
  ]);
  return (
    <>
      <div>
        <div className="flex justify-content-between align-items-center pr-2 mt-3">
          <div className=" px-0 flex justify-content-between mx-0">
            <Buttons
              label="YES"
              className="bg-white border-none text-900 shadow-1"
            ></Buttons>
            <div className="mx-3">
              <Buttons
                label="NO"
                className="bg-white border-none text-900 shadow-1"
              ></Buttons>
            </div>
          </div>
          <div className="flex justify-content-between align-items-center ">
            <div>
              <Input
                type="search"
                icon="pi pi-search"
                placeholder="search"
              ></Input>
            </div>
            <div className="mx-2 mt-2">
              <Buttons
                style={{ height: "38px" }}
                label="Filters"
                className="btn-dark "
              ></Buttons>
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
        <div>
          <div className="mt-2 relative">
            <TableData
              columns={POSPlansColumn}
              data={POSPlansColumnData}
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
    </>
  );
};

export default POS;
