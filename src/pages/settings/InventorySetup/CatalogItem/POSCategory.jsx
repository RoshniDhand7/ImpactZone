import React from "react";
import Buttons from "../../../../components/buttons/button";
import Input from "../../../../components/input/input";
import TableData from "../../../../components/cards/dataTable/dataTable";
import { useState } from "react";

const POSCategory = () => {
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
  const [ManagePaymentPlansData, setManagePaymentPlansData] = useState([
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
        <div className="flex justify-content-between align-items-center pr-2">
          <div className=" px-0 flex justify-content-between mx-0 my-2">
            <Buttons
              label="Shakes"
              className="bg-white border-none text-900 shadow-1"
            ></Buttons>
            <div className="mx-3">
              <Buttons
                label="Bars"
                className="bg-white border-none text-900 shadow-1"
              ></Buttons>
            </div>
            <Buttons
              label="Supplements"
              className="bg-white border-none text-900 shadow-1"
            ></Buttons>
            <div className="mx-3">
              <Buttons
                label="Classes"
                className="bg-white border-none text-900 shadow-1"
              ></Buttons>
            </div>
            <Buttons
              label="Passes"
              className="bg-white border-none text-900 shadow-1"
            ></Buttons>
            <div className="mx-3">
              <Buttons
                label="Training"
                className="bg-white border-none text-900 shadow-1"
              ></Buttons>
            </div>
            <Buttons
              label="Special"
              className="bg-white border-none text-900 shadow-1"
            ></Buttons>
          </div>
          <div className="flex justify-content-between align-items-center ">
            <div className="mx-2">
              <Buttons label="Filters" className="btn-dark "></Buttons>
            </div>
            <Buttons
              label="Add Catalog Item"
              icon="pi pi-plus-circle"
              className="btn-dark"
            ></Buttons>
          </div>
        </div>
        <div>
          <div className="mt-2 relative">
            <TableData
              columns={ManagePaymentPlansColumn}
              data={ManagePaymentPlansData}
              selectionMode={"checkbox"}
            />
            <div className="absolute top-0 right-0 margin">
              <Buttons
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

export default POSCategory;
