import React from "react";
import DropDown from "../../../../../../components/dropdown/dropdown";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import CardWithTitle from "../../../../../../components/cards/cardWithTitle/cardWithTitle";
import Buttons from "../../../../../../components/buttons/button";
import TableData from "../../../../../../components/cards/dataTable/dataTable";
import Input from "../../../../../../components/input/input";
import dummyData from "../../../../../../utils/dummyData";

const ItemCommission = () => {
  const { commissionTableData } = dummyData();
  const commissionGroupTemp = (col) => {
    return <DropDown options={col.commissionGroup}></DropDown>;
  };
  const commissionTypeTemp = (col) => {
    return <DropDown options={col.commissionType}></DropDown>;
  };
  const payTemp = (col) => {
    return <Input placeholder="0.00" icon="pi pi-dollar" iconPos="left" />;
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
      field: "commissionGroup",
      header: "Commission Group",
      body: commissionGroupTemp,
    },
    {
      field: "commissionType",
      header: "Commission Type",
      body: commissionTypeTemp,
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
            <div className="mx-3">
              <Buttons
                label="Add"
                icon="pi pi-plus-circle"
                className="btn-dark p-3 px-4  border-none"
              ></Buttons>
            </div>
            <div className="">
              <Buttons
                label="Save"
                className="btn-dark p-3 px-4  border-none"
              ></Buttons>
            </div>
            <div className="ml-3 ">
              <Buttons
                label="Cancel"
                className="btn-grey p-3   border-none"
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
