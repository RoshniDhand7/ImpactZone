import React, { useEffect } from "react";
import DropDown from "../../../../../../components/dropdown/dropdown";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import Buttons from "../../../../../../components/buttons/button";
import TableData from "../../../../../../components/cards/dataTable/dataTable";
import Input from "../../../../../../components/input/input";
import { useState } from "react";
import CardWithTitle from "../../../../../../components/cards/cardWithTitle/cardWithTitle";

const ItemCommission = ({ setData, data, createEmployee }) => {

  const [payType, setPayType] = useState("");
  const [isPayloadReady, setIsPayloadReady] = useState(false);
  const [commissionRows, setCommissionRows] = useState([{ name: "" }]);
  const commissionGroupOptions = ["Shakes", "Bars", "Supplements"];

  const itemCommissionTableRow = {
      commissionGroup: "",
      // commissionType: "",
      // pay: null,
  };

  const commGroupOptions = [ "Shakes", "Bars", "Supplements" ];
  const commTypeOptions = [ "Per Item", "Per sale" ];

  const [itemCommissionRows, setItemCommissionRows] = useState([ itemCommissionTableRow ]);

  const commissionFields = {
    fields: [
      {
        name: "Commission Type",
        type: "dropdown",
        key: "commissionType",
        placeholder: "Select Type",
      },
      {
        name: "Pay",
        type: "input",
        subType: "number",
        key: "pay",
      },
    ],
  };

  const onSelectCommGroup = (e, index) => {
    if (!commissionRows.some((item) => item.name === e.target.value)) {
      const commissionRowsClone = [...commissionRows];
      commissionRowsClone[index] = {
        name: e.target.value,
        ...commissionFields,
      };
      setCommissionRows(commissionRowsClone);
      setData(() => {
        return {
          ...data,
          salesItemCommission: [
            ...data.salesItemCommission,
            {
              commissionGroup: e.target.value,
            },
          ],
        };
      });
    }
  };

  const addCommissionRow = () => {
    if(itemCommissionRows.length <= commGroupOptions.length) {
      setItemCommissionRows(() => {
        return [
          ...itemCommissionRows,
          itemCommissionTableRow
        ]
      });
    }
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
        <CardWithTitle title="Bonus">
          <div className=" pb-0 ">
            {commissionRows.map((item, index) => {
              return (
                <>
                  <div className="flex p-3">
                    <div className="col-2 mt-2">
                      <DropDown
                        title=""
                        options={commissionGroupOptions}
                        onChange={(e) => onSelectCommGroup(e, index)}
                        placeholder="Select Group"
                        value={item.name}
                      ></DropDown>
                    </div>

                    {item.fields?.map((field, fieldIndex) => {
                      return (
                        <>
                          <div className="col flex ">
                            <div className="col">
                              {field.type === "input" ? (
                                <Input
                                  title=""
                                  // type={field.subType}
                                  // placeholder={field.placeholder}
                                  // onChange={(e) => {
                                  //   onEnterData(e.value, index, field.key);
                                  // }}
                                  // value={
                                  //   data.salesCommissionBonus[index][field.key]
                                  // }
                                ></Input>
                              ) : (
                                <>
                                  <div className="">
                                    <DropDown
                                      title=""
                                      // options={timeFrameOptions}
                                      // onChange={(e) => {
                                      //   onEnterData(
                                      //     e.target.value,
                                      //     index,
                                      //     field.key
                                      //   );
                                      // }}
                                      // placeholder="Time Frame"
                                      // value={
                                      //   data.salesCommissionBonus[index]
                                      //     .timeFramePeriod
                                      // }
                                    ></DropDown>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </>
                      );
                    })}
                    {/* {item.fields ? (
                      <div
                        className="mt-5  cursor-pointer"
                        onClick={() => removePayRow(item)}
                      >
                        <i className="pi pi-minus-circle"></i>
                      </div>
                    ) : (
                      ""
                    )} */}
                  </div>
                </>
              );
            })}
          </div>
        </CardWithTitle>
      </div>
        <div className="flex justify-content-end p-2 ">
          <div className=" mt-3 flex">
            <div className="mx-2">
              <Buttons
                label="Add"
                icon="pi pi-plus-circle"
                className="btn-dark border-none"
                disabled={itemCommissionRows?.some(item => JSON.stringify(item) === JSON.stringify(itemCommissionTableRow)) || itemCommissionRows.length >= commGroupOptions.length}
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
