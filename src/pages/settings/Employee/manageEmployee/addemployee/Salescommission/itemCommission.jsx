import React from "react";
import DropDown from "../../../../../../components/dropdown/dropdown";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import Buttons from "../../../../../../components/buttons/button";
import TableData from "../../../../../../components/cards/dataTable/dataTable";
import Input from "../../../../../../components/input/input";
import dummyData from "../../../../../../utils/dummyData";
import { useState } from "react";

const ItemCommission = () => {
  const { commissionTableData } = dummyData();

  const [payType, setPayType] = useState("");

  const commissionGroupTemp = (col) => {
    return <DropDown options={col.commissionGroup}></DropDown>;
  };
  const commissionTypeTemp = (col) => {
    return <DropDown options={col.commissionType}></DropDown>;
  };

  const changePayType = (e) => {
    setPayType(e.target.value);
  };
  const payTemp = (col) => {
    return (
      <div className="flex align-items-center">
        <Input placeholder="0.00" />
        <input
          type="radio"
          name="payType"
          id="dollar"
          onChange={(e) => changePayType(e)}
          value="dollar"
          hidden
        />
        <label
          htmlFor="dollar"
          className={payType === "dollar" ? "selected-pay-type" : "pay-type"}
        >
          $
        </label>
        <input
          type="radio"
          name="payType"
          id="percentage"
          value="percentage"
          hidden
          onChange={(e) => changePayType(e)}
        />
        <label
          htmlFor="percentage"
          className={
            payType === "percentage" ? "selected-pay-type" : "pay-type"
          }
        >
          %
        </label>
      </div>
    );
  };

  const actionTemp = (col) => {
    return (
      <span>
        <i className="pi pi-minus-circle"></i>
      </span>
    );
  };

  const commissionTableColumns = [
    {
      field: "",
      header: "",
    },

    {
      field: "commissionGroup",
      header: "Commission Group",
      body: commissionGroupTemp,
    },
    {
      field: "",
      header: "",
    },
    {
      field: "",
      header: "",
    },
    {
      field: "commissionType",
      header: "Commission Type",
      body: commissionTypeTemp,
    },
    {
      field: "",
      header: "",
    },
    {
      field: "",
      header: "",
    },

    { field: "pay", header: "Pay", body: payTemp },
    { field: "", header: "", body: actionTemp },
  ];

  return (
    <>
      <div>
        <div>
          <div className="col-2 my-3">
            <DropDown title="similar To"></DropDown>
          </div>
        </div>
        <div>
          <TableData
            data={commissionTableData}
            columns={commissionTableColumns}
          ></TableData>
        </div>
        {/* <div>
          <CardWithTitle
            title="commision Group"
            title2="commission Type"
            title3="Pay"
            title4=""
          >
            <div className="p-3 flex justify-content-between">
              <div className="col-3">
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
              </div>
              <div className="col-3">
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
              </div>
              <div className="col-2">
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
                <DropDown title="" placeholder="select"></DropDown>
              </div>
              <div className="col-2"></div>
            </div>
          </CardWithTitle>
        </div> */}
        <div className="flex justify-content-end p-2 ">
          <div className=" mt-3 flex  ">
            <div className="mx-2">
              <Buttons
                label="Add"
                icon="pi pi-plus-circle"
                className="btn-dark border-none"
              ></Buttons>
            </div>
            <div className="mr-4">
              <Buttons
                label="Save"
                className="btn-dark mx-3 border-none"
              ></Buttons>
            </div>
            <div className=" ">
              <Buttons
                label="Cancel"
                className="btn-grey  border-none"
              ></Buttons>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default ItemCommission;
