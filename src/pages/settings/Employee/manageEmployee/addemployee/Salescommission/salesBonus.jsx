import React, { useState } from "react";
import DropDown from "../../../../../../components/dropdown/dropdown";
import CardWithTitle from "../../../../../../components/cards/cardWithTitle/cardWithTitle";
import Input from "../../../../../../components/input/input";
import Buttons from "../../../../../../components/buttons/button";
import RecentCheckIn from "../../../../../../components/cards/Profilecard/recentCheckIn";
import checkInData from "../../../../../../utils/checkInData";
import Divide from "../../../../../../assets/icons/box.png";
import MuliSelectDropDown from "../../../../../../components/dropdown/muliSelectDropDown";

const SalesBonus = ({ data, setData, createEmployee }) => {
  const [bonusRows, setBonusRows] = useState([{ name: "" }]);
  const bonusTypeOptions = ["Single Item", "Sale Value"];
  const timeFrameOptions = ["Days", "Weeks", "Months", "Years"];
  const [selectedTimeFrame, setSelectedTimeFrame] = useState([]);

  const bonusFields = {
    fields: [
      {
        name: "# of items",
        type: "input",
        subType: "number",
        key: "numberofSessions",
        placeholder: "Enter Days",
        placeholder1: "Enter Value",
      },
      {
        name: "Select Timeframe",
        type: "input",
        subType: "number",
        key: "timeFrameValue",
      },
      {
        name: "",
        type: "dropdown",
        key: "timeFramePeriod",
      },
      {
        name: "Bonus Amount",
        type: "input",
        subType: "number",
        key: "bonusAmount",
      },
    ],
  };

  const onSelectBonusType = (e, index) => {
    if (!bonusRows.some((item) => item.name === e.target.value)) {
      const bonusRowsClone = [...bonusRows];
      bonusRowsClone[index] = {
        name: e.target.value,
        ...bonusFields,
      };
      setBonusRows(bonusRowsClone);
      setData(() => {
        return {
          ...data,
          salesCommissionBonus: [
            ...data.salesCommissionBonus,
            {
              bonusType: e.target.value,
            },
          ],
        };
      });
    }
  };

  function onClickAdd() {
    if (bonusRows.length < 2) {
      setBonusRows((prev) => {
        return [
          ...prev,
          {
            name: "",
          },
        ];
      });
    } else return;
  }
  const removePayRow = (item) => {
    setSelectedTimeFrame([]);
    const index = bonusRows.indexOf(item);
    if (index > -1) {
      if (bonusRows.length <= 1) {
        setBonusRows([
          {
            name: "",
          },
        ]);
      }
      // only splice array when item is found
      else {
        bonusRows.splice(index, 1); // 2nd parameter means remove one item only
        setBonusRows([...bonusRows]);
      }
    }
  };

  const onEnterData = (val, index, keyName) => {
    let salesPayload = [...data.salesCommissionBonus];
    salesPayload[index][keyName] = val;
    setData(() => {
      return {
        ...data,
        salesCommissionBonus: [...salesPayload],
      };
    });
  };

  return (
    <>
      <div className="col-2 mb-2">
        <DropDown title="Similar To"></DropDown>
      </div>
      <div>
        <CardWithTitle title="Bonus">
          <div className=" pb-0 ">
            {bonusRows.map((item, index) => {
              return (
                <>
                  <div className="flex p-3">
                    <div className="col-2 mt-2">
                      <DropDown
                        title=""
                        options={bonusTypeOptions}
                        onChange={(e) => onSelectBonusType(e, index)}
                        placeholder="Bonus Type"
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
                                  type={field.subType}
                                  placeholder={field.placeholder}
                                  onChange={(e) => {
                                    onEnterData(e.value, index, field.key);
                                  }}
                                ></Input>
                              ) : (
                                <>
                                  <div className="">
                                    <DropDown
                                      title=""
                                      options={timeFrameOptions}
                                      onChange={(e) => {
                                        onEnterData(
                                          e.target.value,
                                          index,
                                          field.key
                                        );
                                      }}
                                      placeholder="Time Frame"
                                      value={
                                        data.salesCommissionBonus[index]
                                          .timeFramePeriod
                                      }
                                    ></DropDown>
                                  </div>
                                </>
                              )}
                              <span className="text-xs text-gray-200 p-2 flex justify-content-center ">
                                {fieldIndex === 0 &&
                                item.name === "Single Client"
                                  ? "# of Sessions"
                                  : fieldIndex === 0 &&
                                    item.name === "Sale Value"
                                  ? "Sales Value"
                                  : field.name}
                              </span>
                            </div>
                            {fieldIndex === 0 ? (
                              <span className="mt-3 p-2 text-gray-300">
                                Over
                              </span>
                            ) : fieldIndex === 3 ? (
                              <div
                                style={{ width: "18px", height: "20px" }}
                                className="flex align-items-center mt-4 mr-5"
                              >
                                <span
                                  className={
                                    "mt-2 cursor-pointer " +
                                    (data.salesCommissionBonus[index]
                                      .isPayTypeDollar
                                      ? "selected-price-type"
                                      : "")
                                  }
                                  onClick={() => {
                                    data.salesCommissionBonus[
                                      index
                                    ].isPayTypeDollar = true;
                                    setData({ ...data });
                                  }}
                                >
                                  $
                                </span>
                                <span
                                  className={
                                    "mt-2 cursor-pointer ml-3 " +
                                    (!data.salesCommissionBonus[index]
                                      .isPayTypeDollar
                                      ? "selected-price-type"
                                      : "")
                                  }
                                  onClick={() => {
                                    data.salesCommissionBonus[
                                      index
                                    ].isPayTypeDollar = false;
                                    setData({ ...data });
                                  }}
                                >
                                  %
                                </span>
                              </div>
                            ) : null}
                          </div>
                        </>
                      );
                    })}
                    {item.fields ? (
                      <div
                        className="mt-5 pt-1 cursor-pointer"
                        onClick={() => removePayRow(item)}
                      >
                        <i className="pi pi-minus-circle"></i>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              );
            })}
          </div>
        </CardWithTitle>
      </div>
      <div className="flex justify-content-end  m-2 mt-3 ">
        <div className="mr-2">
          <Buttons
            onClick={onClickAdd}
            label="Add"
            icon="pi pi-plus-circle"
            className="btn-dark  border-none"
          ></Buttons>
        </div>
        <div className="mr-4">
          <Buttons
            onClick={() => {
              return createEmployee();
            }}
            label="Save"
            className="btn-dark mx-3 border-none"
          ></Buttons>
        </div>
        <div className=" ">
          <Buttons label="Cancel" className="btn-grey  border-none"></Buttons>
        </div>
      </div>

      <div>
        <RecentCheckIn data={checkInData} />
      </div>
    </>
  );
};

export default SalesBonus;
