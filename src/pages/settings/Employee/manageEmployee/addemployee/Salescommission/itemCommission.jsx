import React, { useEffect } from "react";
import DropDown from "../../../../../../components/dropdown/dropdown";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import Buttons from "../../../../../../components/buttons/button";
import TableData from "../../../../../../components/cards/dataTable/dataTable";
import Input from "../../../../../../components/input/input";
import { useState } from "react";

const ItemCommission = ({ setData, data, createEmployee }) => {

  const [payType, setPayType] = useState("");
  const [isPayloadReady, setIsPayloadReady] = useState(false);

  const itemCommissionTableRow = {
      commissionGroup: "",
      commissionType: "",
      pay: null,
  };

  const commGroupOptions = [ "Shakes", "Bars", "Supplements" ];
  const commTypeOptions = [ "Per Item", "Per sale" ];

  const [itemCommissionRows, setItemCommissionRows] = useState([ itemCommissionTableRow ]);

  const commissionGroupTemp = (col) => {
    return <DropDown options={commGroupOptions} value={col.commissionGroup} placeholder="Select Group" onChange={(e) => {
      col.commissionGroup = e.value;
      return setItemCommissionRows([...itemCommissionRows]);
    }}></DropDown>;
  };

  const commissionTypeTemp = (col) => {
    return <DropDown options={commTypeOptions} value={col.commissionType} placeholder="Select Type" onChange={(e) =>  {
      col.commissionType = e.value;
      return setItemCommissionRows([...itemCommissionRows]);
    }}></DropDown>;
  };

  const changePayType = (e) => {
    setPayType(e.target.value);
  };

  const payTemp = (col) => {
    return (
      <div className="flex align-items-center">
        <Input type="number" placeholder="0.00" value={col.pay} onChange={(e) => {
          col.pay = e.value;
          return setItemCommissionRows([...itemCommissionRows]);
        }}/>
        <input
          type="radio"
          name="payType"
          id="dollar"
          onChange={(e) => changePayType(e)}
          value="dollar"
          hidden
        />
        <label
          HtmlFor="dollar"
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
          HtmlFor="percentage"
          className={
            payType === "percentage" ? "selected-pay-type" : "pay-type"
          }
        >
          %
        </label>
      </div>
    );
  };

  const actionTemp = (col, field) => {
    return (
      <span onClick={() => {
        return removeCommissionRow(col, field);
      }}>
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

  const addCommissionRow = () => {
    setItemCommissionRows(() => {
      return [
        ...itemCommissionRows,
        itemCommissionTableRow
      ]
    });
  };

  useEffect(() => {
    if(isPayloadReady) {
      createEmployee();
    }
  }, [ data ]);

  const removeCommissionRow = (item, field) => {
    const index = field.rowIndex;
    if(index > 0) {
      itemCommissionRows.splice(index, 1);
      setItemCommissionRows([...itemCommissionRows]);
    } else {
      itemCommissionRows[index] = { ...itemCommissionTableRow };
      setItemCommissionRows([...itemCommissionRows]);
    }
  };

  // const 
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
            data={itemCommissionRows}
            columns={commissionTableColumns}
          ></TableData>
        </div>
        <div className="flex justify-content-end p-2 ">
          <div className=" mt-3 flex">
            <div className="mx-2">
              <Buttons
                label="Add"
                icon="pi pi-plus-circle"
                className="btn-dark border-none"
                disabled={itemCommissionRows?.some(item => JSON.stringify(item) === JSON.stringify(itemCommissionTableRow))}
                onClick={addCommissionRow}
              ></Buttons>
            </div>
            <div className="mr-4">
              <Buttons
                label="Save"
                className="btn-dark mx-3 border-none"
                disabled={itemCommissionRows?.some(item => JSON.stringify(item) === JSON.stringify(itemCommissionTableRow))}
                onClick={() => {
                  const salesItemCommissionClone = [...itemCommissionRows];
                  setData(() => {
                    return {
                      ...data,
                      salesItemCommission: salesItemCommissionClone
                    }
                  });
                  setIsPayloadReady(true);
                }}
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
