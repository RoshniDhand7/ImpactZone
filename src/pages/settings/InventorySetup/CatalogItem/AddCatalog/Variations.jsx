import React from "react";
import CardWithTitle from "../../../../../components/cards/cardWithTitle/cardWithTitle";
import addvariation from "../../../../../assets/icons/add variation.png";
import TableData from "../../../../../components/cards/dataTable/dataTable";
import Input from "../../../../../components/input/input";
import { useState } from "react";
import PopUp from "../../../../../components/popup/popup";
import AddVariationPop from "../../../../popups/AddVariationPop";

const Variations = () => {
  const [isActive, setIsActive] = useState(false);
  const [ShowTable, setShowTable] = useState();
  const onClickShowTable = () => {
    setShowTable((prev) => !prev);
  };
  const [popUp, setPopUp] = useState({
    title: "",
    show: null,
  });

  const showPopUp = async (title, data) => {
    setPopUp({
      title: title,
      show: data,
    });
    setIsActive(true);
  };

  const AddEvent = (col) => {
    return (
      <>
        <div className="flex justify-content-end w-8 p-0">
          <Input
            label="Add Event"
            className="bg-transparent text-blue-900 border-1 border-blue-900 p-0"
          ></Input>
        </div>
      </>
    );
  };
  const UnitPrice = (col) => {
    return (
      <>
        <div className="flex justify-content-center align-items-center p-0 ">
          <Input
            label="Add Event"
            className="bg-transparent text-blue-900 border-1 border-blue-900"
          ></Input>
          <small className="text-sm mx-2">
            Markup:
            <span className="text-green">15%</span>
          </small>
        </div>
      </>
    );
  };
  const variationColumn = [
    {
      field: "SubVariation",
      header: "SubVariation",
    },
    {
      field: "Sku",
      header: "Sku",
      body: AddEvent,
    },
    {
      field: "UnitPrice",
      header: "Unit Price",
      body: UnitPrice,
    },
    {
      field: "MinimumQuantity",
      header: "Minimum Quantity",
      body: AddEvent,
    },
    {
      field: "MaximumQuantity",
      header: "Maximum Quantity",
      body: AddEvent,
    },
    {
      field: "WholesaleCost",
      header: "Wholesale Cost",
      body: AddEvent,
    },
    {
      field: "ReorderQuantity",
      header: "Reorder Quantity",
      body: AddEvent,
    },
  ];

  const variationData = [
    {
      SubVariation: "Sub Variation 1",
    },
  ];

  return (
    <>
      <PopUp
        setIsActive={setIsActive}
        title={popUp.title}
        isActive={isActive}
        className={"col-4 p-0"}
        data={popUp.show ? popUp.show() : null}
      />
      <div className="">
        <CardWithTitle title="General">
          <div className="p-3 ">
            <div
              className="border-round btn-dark flex align-items-center flex p-3 mb-2 cursor-pointer"
              onClick={() => showPopUp("Add Variation", AddVariationPop)}
            >
              <img
                src={addvariation}
                alt=""
                style={{ width: "13px", height: "13px" }}
              />
              <h3 className="text-lg mx-3 font-medium">Add Variation</h3>
            </div>
            <div className="flex justify-content-between border-round btn-dark flex align-items-center   p-3 mb-2">
              <h3 className="text-lg mx-3 font-medium">Red</h3>
              <div>
                <i className="pi pi-pencil text-white "></i>
                <i className="pi pi-trash text-white mx-3"></i>
                <i
                  className={
                    ShowTable
                      ? "pi pi-angle-down text-white cursor-pointer"
                      : "pi pi-angle-up text-white cursor-pointer"
                  }
                  onClick={onClickShowTable}
                ></i>
              </div>
            </div>
            {ShowTable ? (
              <TableData
                columns={variationColumn}
                data={variationData}
                editMode={"row"}
              />
            ) : (
              ""
            )}
          </div>
        </CardWithTitle>
      </div>
    </>
  );
};

export default Variations;
